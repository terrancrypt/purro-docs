---
title: Transfers via Hyperliquid Names
description: Send and receive using .hl names instead of addresses.
---

Purro integrates Hyperliquid Names to simplify transfers and reduce errors.

## Sending with Hyperliquid Names

- Use `.hl` format names (e.g., `purro.hl`, `trader.hl`) when sending transactions
- Names are automatically resolved to addresses before sending
- Safer, more readable UX for everyday transfers
- No need to remember or copy-paste long addresses

## Importing Accounts for Watching

- Import accounts using `.hl` names to watch their activity
- Example: Import `purro.hl` to monitor transactions and balances
- Watch-only accounts don't require private keys
- Perfect for monitoring multiple addresses or tracking specific users

## Examples

**Sending transactions:**
- Send to `purro.hl` instead of `0x1234...abcd`
- Send to `trader.hl` for quick transfers
- Names are validated and resolved automatically

**Importing for watching:**
- Import `purro.hl` as a watch-only account
- Monitor transactions and portfolio changes
- No private key required for watching

Developers can access name resolution via the Purro SDK for consistent behavior across dApps. 