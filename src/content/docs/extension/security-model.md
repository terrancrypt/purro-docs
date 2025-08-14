---
title: Security Model
description: Comprehensive security architecture with implementation examples for developers.
---

Purro Extension implements a multi-layered security architecture designed to protect user assets and private keys through robust encryption, secure session management, and comprehensive access controls.

## Core Security Principles

### Key Management & Storage
- **Local-only generation**: All cryptographic keys are generated locally using secure browser crypto APIs
- **Strong encryption**: AES-256-GCM encryption with PBKDF2-derived keys (600,000 iterations)
- **No plaintext persistence**: Private keys and seed phrases are never stored in plaintext
- **Per-record security**: Each encrypted record uses unique random salt and nonce values

### Session Security & Access Control
- **Auto-lock mechanisms**: Automatic wallet locking on inactivity, tab closure, or manual trigger
- **Session-scoped access**: Decryption keys only available during active, authenticated sessions
- **Re-authentication**: Sensitive operations require password re-entry
- **Memory protection**: Session data is securely cleared from memory on lock

### Origin Isolation & dApp Security
- **Per-origin permissions**: Each website receives isolated, scoped access
- **Provider injection**: Secure injection of wallet provider with origin-specific context
- **Connection warnings**: Clear alerts for unverified or suspicious domains
- **Transaction context**: Human-readable transaction summaries before signing

### Transaction & Signature Safety
- **Structured data preference**: Prioritizes EIP-712 typed data for clear transaction intent
- **Pre-signature review**: Comprehensive display of recipient, token, value, and network details
- **Gas parameter validation**: Built-in guardrails against suspicious gas settings
- **Multi-step confirmation**: Progressive disclosure for complex transactions

## Implementation Details for Developers

### Encryption Configuration

**Security Constants**
```typescript
const SECURITY_CONFIG = {
  PBKDF2_ITERATIONS: 600000,  // Increased from 100k for better security
  SALT_LENGTH: 32,            // 256-bit salt
  NONCE_LENGTH: 16,           // 128-bit nonce for AES-GCM
  TAG_LENGTH: 16,             // 128-bit authentication tag
  KEY_LENGTH: 256,            // AES-256
  HASH_ALGORITHM: 'SHA-256'
};
```

**Key Derivation Implementation**
```typescript
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: SECURITY_CONFIG.PBKDF2_ITERATIONS,
      hash: SECURITY_CONFIG.HASH_ALGORITHM
    },
    keyMaterial,
    { name: 'AES-GCM', length: SECURITY_CONFIG.KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}
```

**Data Encryption Pattern**
```typescript
interface EncryptedData {
  data: string;        // Base64 encoded encrypted data
  nonce: string;       // Base64 encoded nonce
  salt: string;        // Base64 encoded salt
  digest: string;      // SHA-256 integrity hash
}

async function encryptData(plaintext: string, password: string): Promise<EncryptedData> {
  // Generate random salt and nonce
  const salt = crypto.getRandomValues(new Uint8Array(SECURITY_CONFIG.SALT_LENGTH));
  const nonce = crypto.getRandomValues(new Uint8Array(SECURITY_CONFIG.NONCE_LENGTH));
  
  // Derive encryption key
  const key = await deriveKey(password, salt);
  
  // Encrypt data
  const plaintextBuffer = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: nonce,
      tagLength: SECURITY_CONFIG.TAG_LENGTH * 8
    },
    key,
    plaintextBuffer
  );
  
  // Generate integrity hash
  const digest = await crypto.subtle.digest(SECURITY_CONFIG.HASH_ALGORITHM, plaintextBuffer);
  
  return {
    data: arrayBufferToBase64(encrypted),
    nonce: arrayBufferToBase64(nonce),
    salt: arrayBufferToBase64(salt),
    digest: arrayBufferToBase64(digest)
  };
}
```

**Decryption with Integrity Verification**
```typescript
async function decryptData(encryptedData: EncryptedData, password: string): Promise<string> {
  // Convert base64 back to buffers
  const salt = base64ToArrayBuffer(encryptedData.salt);
  const nonce = base64ToArrayBuffer(encryptedData.nonce);
  const ciphertext = base64ToArrayBuffer(encryptedData.data);
  
  // Derive decryption key
  const key = await deriveKey(password, new Uint8Array(salt));
  
  // Decrypt data
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: nonce,
      tagLength: SECURITY_CONFIG.TAG_LENGTH * 8
    },
    key,
    ciphertext
  );
  
  // Verify integrity
  const computedDigest = await crypto.subtle.digest(SECURITY_CONFIG.HASH_ALGORITHM, decrypted);
  if (!secureCompare(arrayBufferToBase64(computedDigest), encryptedData.digest)) {
    throw new Error('Data integrity verification failed');
  }
  
  return new TextDecoder().decode(decrypted);
}
```

### Storage Security Implementation

**Storage Key Structure**
```typescript
const STORAGE_KEYS = {
  ACCOUNTS: 'purro:accounts',
  ACCOUNT_BY_ID: 'purro:account:{id}',
  PRIVATE_KEY_BY_ID: 'purro:private-key:{id}',
  SEED_PHRASE_BY_ID: 'purro:seed-phrase:{id}',
  PASSWORD_HASH: 'purro:password-hash',
  SESSION_STATE: 'purro:session-state'
};
```

**Secure Storage Pattern**
```typescript
async function saveEncryptedPrivateKey(accountId: string, privateKey: string, password: string): Promise<void> {
  // Generate deterministic ID from private key hash
  const keyId = await hashData(privateKey);
  
  // Encrypt private key
  const encryptedKey = await encryptData(privateKey, password);
  
  // Store encrypted data
  const storageKey = STORAGE_KEYS.PRIVATE_KEY_BY_ID.replace('{id}', keyId);
  await chrome.storage.local.set({ [storageKey]: encryptedKey });
  
  // Update account reference (never store raw key)
  await updateAccountReference(accountId, { privateKeyId: keyId, source: 'privateKey' });
}
```

**Password Verification System**
```typescript
interface PasswordData {
  hash: string;  // PBKDF2 hash of password
  salt: string;  // Random salt used for hashing
}

async function hashPassword(password: string, salt?: Uint8Array): Promise<PasswordData> {
  const saltBytes = salt || crypto.getRandomValues(new Uint8Array(SECURITY_CONFIG.SALT_LENGTH));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: SECURITY_CONFIG.PBKDF2_ITERATIONS,
      hash: SECURITY_CONFIG.HASH_ALGORITHM
    },
    keyMaterial,
    256 // 32 bytes
  );
  
  return {
    hash: arrayBufferToBase64(hashBuffer),
    salt: arrayBufferToBase64(saltBytes)
  };
}

async function verifyPassword(password: string, storedData: PasswordData): Promise<boolean> {
  const salt = base64ToArrayBuffer(storedData.salt);
  const { hash } = await hashPassword(password, new Uint8Array(salt));
  return secureCompare(hash, storedData.hash);
}
```

### Session Management

**Secure Session Structure**
```typescript
interface SessionData {
  password: string;    // Plaintext password (memory only)
  timestamp: number;   // Session creation time
  expiresAt: number;   // Session expiration time
}

// Offscreen document session management
let session: SessionData | null = null;

function setSession(data: SessionData): void {
  session = data;
  scheduleSessionCleanup(data.expiresAt - Date.now());
}

function getSession(): SessionData | null {
  if (!session || Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }
  return session;
}

function clearSession(): void {
  if (session?.password) {
    // Secure memory cleanup - overwrite multiple times
    const len = session.password.length;
    session.password = '0'.repeat(len);
    session.password = '1'.repeat(len);
    session.password = crypto.getRandomValues(new Uint8Array(len)).join('');
    session.password = '';
  }
  session = null;
}
```

**Auto-lock Implementation**
```typescript
class SessionManager {
  private lockTimeout: number | null = null;
  
  async unlock(password: string): Promise<void> {
    // Verify password against stored hash
    const storedPassword = await this.getStoredPasswordData();
    const isValid = await verifyPassword(password, storedPassword);
    
    if (!isValid) {
      throw new Error('Invalid password');
    }
    
    // Create session in offscreen document
    const sessionData: SessionData = {
      password,
      timestamp: Date.now(),
      expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutes
    };
    
    await this.sendToOffscreen('SET_SESSION', sessionData);
    await this.updateLockState(false);
    this.scheduleAutoLock(sessionData.expiresAt - Date.now());
  }
  
  private scheduleAutoLock(timeoutMs: number): void {
    if (this.lockTimeout) {
      clearTimeout(this.lockTimeout);
    }
    
    this.lockTimeout = setTimeout(async () => {
      await this.lock();
    }, timeoutMs);
  }
  
  async lock(): Promise<void> {
    await this.sendToOffscreen('CLEAR_SESSION', null);
    await this.updateLockState(true);
    
    if (this.lockTimeout) {
      clearTimeout(this.lockTimeout);
      this.lockTimeout = null;
    }
  }
}
```

### Key Access Patterns

**On-demand Decryption**
```typescript
async function getPrivateKeyForSigning(accountId: string): Promise<string> {
  // Verify session is active
  const session = await getActiveSession();
  if (!session) {
    throw new Error('Wallet is locked - please unlock first');
  }
  
  // Get account metadata
  const account = await getAccountById(accountId);
  
  let privateKey: string;
  
  if (account.source === 'privateKey') {
    // Direct private key import
    const encryptedKey = await getEncryptedPrivateKey(account.privateKeyId);
    privateKey = await decryptData(encryptedKey, session.password);
    
  } else if (account.source === 'seedPhrase') {
    // HD wallet derivation
    const seedData = await getEncryptedSeedPhrase(account.seedPhraseId);
    const mnemonic = await decryptData(seedData.data, session.password);
    
    // Derive private key from seed
    const wallet = deriveWalletFromMnemonic(mnemonic, account.derivationIndex);
    privateKey = wallet.privateKey;
  }
  
  return privateKey;
}
```

### UI Security Patterns

**Export Protection Flow**
```typescript
// Component: ExportPrivateKeyDialog
async function handleExportRequest(): Promise<void> {
  // Step 1: Re-authenticate user
  const password = await promptForPassword('Confirm your password to export private key');
  
  // Step 2: Verify password
  try {
    await verifyCurrentPassword(password);
  } catch (error) {
    throw new Error('Incorrect password');
  }
  
  // Step 3: Show security warning
  const confirmed = await showSecurityWarning(
    'Private keys give full access to your funds. Never share them with anyone.'
  );
  
  if (!confirmed) return;
  
  // Step 4: Export with temporary display
  const privateKey = await getPrivateKeyForExport(accountId, password);
  await showPrivateKeyModal(privateKey, {
    autoHide: 30000, // Auto-hide after 30 seconds
    preventScreenshot: true,
    clearClipboard: true
  });
}
```

### Security Utilities

**Secure Comparison Function**
```typescript
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  
  return result === 0;
}
```

**Data Hashing for IDs**
```typescript
async function hashData(data: string): Promise<string> {
  const buffer = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return arrayBufferToBase64(hashBuffer);
}
```

## Security Testing Guidelines

### Unit Test Examples
```typescript
describe('Encryption Security', () => {
  test('should encrypt and decrypt data correctly', async () => {
    const plaintext = 'sensitive data';
    const password = 'strong-password-123';
    
    const encrypted = await encryptData(plaintext, password);
    const decrypted = await decryptData(encrypted, password);
    
    expect(decrypted).toBe(plaintext);
  });
  
  test('should fail with wrong password', async () => {
    const plaintext = 'sensitive data';
    const encrypted = await encryptData(plaintext, 'correct-password');
    
    await expect(
      decryptData(encrypted, 'wrong-password')
    ).rejects.toThrow();
  });
  
  test('should detect data tampering', async () => {
    const encrypted = await encryptData('data', 'password');
    
    // Tamper with the data
    encrypted.data = encrypted.data.slice(0, -4) + 'xxxx';
    
    await expect(
      decryptData(encrypted, 'password')
    ).rejects.toThrow('Data integrity verification failed');
  });
});
```

## Security Checklist for Developers

### Implementation Requirements
- [ ] Use crypto.getRandomValues() for all random generation
- [ ] Never store passwords or keys in plaintext
- [ ] Implement secure memory cleanup for sensitive data
- [ ] Use constant-time comparison for password/hash verification
- [ ] Validate all inputs and enforce size limits
- [ ] Implement proper session timeout and auto-lock
- [ ] Add integrity verification to all encrypted data
- [ ] Use secure communication patterns between components

### Testing Requirements
- [ ] Test encryption/decryption with various data sizes
- [ ] Verify password verification rejects wrong passwords
- [ ] Test session expiration and cleanup
- [ ] Verify data integrity checks detect tampering
- [ ] Test auto-lock functionality
- [ ] Validate input sanitization and bounds checking

### Deployment Security
- [ ] Enable Content Security Policy (CSP)
- [ ] Use HTTPS for all external communications
- [ ] Implement proper error handling without information leakage
- [ ] Regular dependency security audits
- [ ] Code signing for extension packages

This comprehensive security model ensures that Purro Extension provides robust protection for user assets while maintaining usability and providing clear implementation guidance for developers. 