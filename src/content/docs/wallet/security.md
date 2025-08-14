---
title: Security Design
description: Key management, sessions, dApp isolation, and safe signing.
---

Purro’s security model balances strong guarantees with practical UX.

## Key Management
- Local-only generation and storage
- AES‑256‑GCM encryption; PBKDF2-derived keys
- No plaintext seed or key storage; secure random via browser crypto

## Sessions & Locking
- Auto-lock on inactivity or tab close
- Manual lock and re-authentication for sensitive actions

## dApp Isolation
- Per-origin permissions; scoped provider injection
- Connection warnings and domain verification

## Safe Signing
- EIP‑712 typed signing preferred
- Pre-signing review with human‑readable context
- Guardrails for gas parameters and malformed transactions

## Risks & Disclaimer
- Informational only; not legal/financial advice
- Non-custodial: users control keys; team cannot recover seeds or funds
- Features and timelines may change; third-party dependencies can affect delivery
- Users are responsible for secure backups and device hygiene

> Developer deep dive on key security and code references: see Extension › Security Model. 