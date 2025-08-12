---
title: Developer SDK & Provider
description: Integrate Purro with EIP-1193/6963/712 support and SDK modules.
---

Purro offers both a standards-compliant EVM provider and modular SDKs.

## Provider
- EIP-1193 request/response, events (`accountsChanged`, `chainChanged`)
- EIP-6963 multi-wallet discovery for dApp compatibility
- EIP-712 typed data signing

## SDK Modules
- Swap and bridge helpers with gas abstraction
- Hyperliquid Name resolution and validation
- Connection flows for embedded or external dApps

## Best Practices
- Prefer EIP-712 for human-readable signatures
- Scope permissions per-origin and persist least-privilege access
- Use SDK helpers for cross-surface continuity (browser, embedded views) 