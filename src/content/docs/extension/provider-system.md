---
title: Provider System
---

## Goals
- Comply with EIP-1193 so dApps integrate seamlessly
- Support EIP-6963 for multi-provider discovery and coexistence
- Maintain legacy compatibility (enable, send, sendAsync) for older dApps

## Discovery – EIP-6963
- Announce provider details (rdns, icon, name)
- Listen for `eip6963:requestProvider` and respond with provider detail
- Allow dApps to enumerate multiple wallets at once

## Injection (Legacy + Modern)
- If `window.ethereum` is absent, provide a default provider
- Always expose `window.purro` for direct access
- Separate the injected provider (page layer) from the bridge (content script)

## Request Handling – EIP-1193
- `eth_requestAccounts`, `eth_accounts`
- `eth_chainId`, `wallet_switchEthereumChain`, `wallet_addEthereumChain`
- `eth_sendTransaction` (confirmation UI, broadcast via RPC)
- `personal_sign`, `eth_signTypedData_v4` (confirmation UI, signing in Background)
- Standardize error responses using JSON-RPC/provider codes

## Events
- `connect`, `disconnect`
- `accountsChanged`
- `chainChanged`
- Debounce to prevent event spam during rapid state transitions

## Bridge and Safety
- All requests are routed to Background for origin/permission checks
- Provider never holds keys; Background performs signing/broadcasting
- Timeout-aware syncing of `selectedAddress` and `chainId`

## Extensibility
- Add new RPC methods via handler registries/switches
- Add chains by registering chain metadata and RPC endpoints
- Plugin-friendly shape to attach domain-specific handlers when needed 