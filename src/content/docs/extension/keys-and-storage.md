---
title: Keys and Storage
description: Key derivation, encryption, and persistence mechanics.
---

## Wallet Creation and Import
- Generate 12-word seed phrases with proper entropy and checksum validation
- Import from seed phrase or private key; detect duplicates via deterministic identifiers (hashes)
- Multi-chain capable (EVM first; others can be added incrementally)

## Key Derivation
- Derive according to the chain’s standards (EVM: BIP32/44 → private key)
- Support multiple accounts from the same seed; store seed references (ids) rather than raw seed

## Conceptual Storage Layout
- Accounts: list of accounts with metadata (name, icon, order)
- Seed vault: encrypted seed phrases, referenced by `seedPhraseId`
- Private keys: encrypted keys (for PK imports) with their own ids
- Connected sites: per-origin permissions per account
- Session flags: lock/unlock state and expiry timestamps

## Crypto Workflow
1) On first password setup → store password hash + salt
2) On unlock/import password → create offscreen session with `expiresAt`
3) When sensitive data is needed → fetch password from offscreen session
4) Derive per-record keys with PBKDF2 and random salt
5) Encrypt using AES‑256‑GCM with random nonce; store `{ciphertext, salt, nonce}`
6) Zeroize sensitive memory after use 