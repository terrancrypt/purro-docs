---
title: Smart Wallet (Account Abstraction)
description: Upcoming module for session keys, gas abstraction, and programmable accounts.
---

The Smart Wallet module introduces account abstraction (AA) for advanced UX while preserving non-custodial control.

## Planned Capabilities
- Session keys for smooth multi-step dApp interactions
- Gas abstraction via relayers/paymasters (pay in USDC/HYPE/others)
- Batched actions (approve + swap + bridge)
- Social recovery and programmable permissions

Standards alignment: EIP-4337 (AA), EIP-1271 (signature validation), deterministic deployment (CREATE2).

Availability: planned as an optional module; existing EOA flows remain supported.

## Why Smart Wallets over MPC
- Gas abstraction and fee sponsorship supported; MPC cannot natively sponsor gas on EVM
- Atomic batching and onchain composability vs. opaque offchain signing flows
- Open, auditable logic aligned with EIP-4337/1271 vs. closed cryptographic implementations
- Seamless relayer/bundler integration and upgradeable logic

## Integration via SDK (Planned)
- Session key issuance and scoped permissions
- Fee delegation with paymasters and deterministic deployment
- Batched execution invoked from dApp UI with minimal config 