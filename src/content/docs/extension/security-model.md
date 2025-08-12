---
title: Security Model
---

## Security Goals
- Protect private keys and seed phrases from disclosure
- Require user authentication/approval for sensitive actions
- Scope access by origin and by session
- Reduce risks from untrusted dApps (XSS/CSRF/phishing)

## Data Encryption
- Algorithm: AES-256-GCM (with 128-bit authentication tag)
- KDF: PBKDF2 with ≥ 600,000 iterations
- Salt: ≥ 32 bytes of randomness per password
- Nonce (IV): ≥ 16 bytes of randomness per encryption
- Limits: never store sensitive data in plaintext; enforce maximum data size

## Passwords and Sessions
- Passwords are hashed and stored securely; plaintext is never persisted
- Session is kept in an offscreen context, separated from UI and content script
- Default timeout is 30 minutes; configurable between 5 minutes and 24 hours
- Chrome Alarms enforce auto-lock when the session expires

## Permissions and Validation
- Every request includes origin and is validated in Background
- User approvals required for:
  - Account access (connecting a dApp)
  - Sending transactions and signing messages (personal_sign, EIP-712)
  - Adding/switching chains (wallet_add/switchEthereumChain)
- Per-site permission management with revocation via UI

## Safe Error Handling
- Standardized codes: 4001 (USER_REJECTED), 4100 (UNAUTHORIZED), 4200 (UNSUPPORTED_METHOD), 4900/4901 (DISCONNECTED), -32602/-32603 (JSON-RPC)
- Avoid leaking sensitive information in errors
- Controlled logging; never log secrets or private data

## Input Constraints and Sanitization
- Enforce password length and reject control characters
- Validate base64 format and cap encrypted payload sizes
- Validate RPC methods/params before execution

## Threat Model (Summary)
- Malicious pages/dApps: restricted by origin checks + explicit user approvals
- XSS in UI: sensitive state isolated in Background/offscreen; sanitize rendered content
- Timing/resource abuse: high KDF iterations, data size limits, debounced events
- DoS/resource exhaustion: size ceilings, max iterations, request batching
- Session exposure: offscreen storage, auto-lock, no plaintext password storage

## Recommended Practices
- Never export seed/private key without explicit user action and warnings
- Show full details for every approval (transactions/signing)
- Provide flexible auto-lock settings for different risk profiles
- Encourage hardware wallet support when available 