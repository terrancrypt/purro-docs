---
title: Provider System
description: Injected EVM provider with discovery, standards, and origin validation.
---

Purro injects a standards-compliant EVM provider for seamless dApp interoperability.

## Standards
- EIP-1193: request/response and events
- EIP-6963: multi-wallet discovery and selection
- EIP-712: typed data signing

## Compatibility
- Legacy web3 fallbacks for older dApps
- Per-origin permissions and scoped injection

## Notes
- Clear transaction and message summaries to reduce blind signing
- Chain switching and permission tracking per origin 