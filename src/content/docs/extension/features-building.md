---
title: Purro Extension Features Building
description: Purro Extension Features Building
---

## Wallet Management
- [x] Create new wallet with 12-word seed phrase
- [x] Import wallet from seed phrase or private key
- [x] Watch-only accounts for address monitoring
- [x] Data encryption with password protection
- [x] Auto-lock after inactivity period
- [x] Password change functionality
- [x] Delete seed phrase option
- [x] Reset wallet functionality
- [x] Export private key with password verification

## Multi-Network Support
- [x] **Hyperliquid EVM** (mainnet & testnet) - Primary network
- [x] **Ethereum** mainnet
- [x] **Arbitrum** One
- [x] **Base** mainnet
- [x] **HyperEVM Testnet** (developer mode)
- [ ] **Solana** (in development)
- [ ] **Sui** (in development)

## Main Interface
- [x] **Home Screen** with portfolio overview
  - [x] EVM tab with token balances
  - [x] Spot tab for Hyperliquid DEX
  - [x] Perpetuals tab for Hyperliquid DEX
  - [x] Developer mode toggle
- [x] **Swap Screen** (redirects to external DEXes)
- [x] **NFT Screen** with collection viewing
- [x] **History Screen** with transaction history
- [x] **Account switching** with account sheet

## Transaction Features
- [x] **Send tokens on EVM networks**
  - [x] Token selection
  - [x] Amount input with balance validation
  - [x] Gas estimation
  - [x] Transaction confirmation
- [x] **Send tokens on Hyperliquid DEX**
  - [x] DEX token transfer
  - [x] Transaction success confirmation
- [x] **Receive tokens**
  - [x] Multi-network address display
  - [x] QR code generation
  - [x] Copy address functionality

## Bridge & DEX Integration
- [x] **Bridge drawer** (links to external bridges)
  - [x] Hyperliquid DEX integration
  - [x] HyperUnit integration
  - [x] deBridge integration
- [x] **Swap drawer** (links to external DEXes)
  - [x] HyperSwap integration
  - [x] Laminar integration
  - [x] KittenSwap integration
  - [x] LiquidSwap integration
- [x] **Deposit to Hyperliquid DEX**
  - [x] Transfer from Hyperliquid DEX
  - [x] Deposit USDC from Arbitrum

## NFT Features
- [x] **NFT collection display**
- [x] **NFT instance viewing** with pagination
- [x] **NFT detail dialog** with metadata
- [x] **IPFS image support**
- [x] **Hyperliquid Name (HL Name) support**
- [x] **ERC-721 and ERC-1155 support**

## Portfolio & History
- [x] **Token portfolio** with real-time balances
- [x] **Transaction history** with infinite scroll
- [x] **Transaction detail view**
- [x] **HyperScan integration** for transaction data
- [x] **Hyperliquid Name resolution** in history
- [x] **Token metadata caching**

## dApp Integration
- [x] **EIP-1193** standard support
- [x] **EIP-6963** multi-provider discovery
- [x] **EIP-712** typed data signing
- [x] **Legacy methods** compatibility
- [x] **Provider injection** for web pages
- [x] **Connection management** with site permissions
- [x] **Transaction signing** with user confirmation
- [x] **Message signing** with security warnings

## Settings & Configuration
- [x] **Connected DApps management**
- [x] **Active network selection**
- [x] **Developer mode** for testnet access
- [x] **Auto-lock time configuration**
- [x] **Password management**
- [x] **Testnet token management**
- [x] **Token cache management**

## Account Management
- [x] **Multiple account support**
- [x] **Account creation** from existing seed
- [x] **Account import** (private key/seed phrase)
- [x] **Account editing**
  - [x] Change account name
  - [x] Change account icon
  - [x] View private key (with password)
  - [x] View seed phrase (with password)
  - [x] Delete account
- [x] **Watch-only account import**

## Security Features
- [x] **AES-256-GCM** encryption for sensitive data
- [x] **PBKDF2** key derivation from password
- [x] **Secure random** seed generation
- [x] **Origin validation** for all requests
- [x] **User confirmation** for transactions
- [x] **Per-site permissions** management
- [x] **Session timeout** protection
- [x] **Forgot password** recovery flow

## User Interface
- [x] **Modern UI** with Tailwind CSS
- [x] **Responsive design**
- [x] **Dark theme** by default
- [x] **Smooth animations** with Framer Motion
- [x] **Side panel** support
- [x] **Dialog system** for modals
- [x] **Drawer system** for bottom sheets
- [x] **Toast notifications**

## Developer Features
- [x] **Developer mode** for testnet access
- [x] **Testnet chain support**
- [x] **Debug logging**
- [x] **Unit testing** for handlers
- [x] **Type safety** with TypeScript

## Extension Features
- [x] **Manifest V3** compliance
- [x] **Background script** with service worker
- [x] **Content script** injection
- [x] **Offscreen document** for cryptographic operations
- [x] **Side panel** integration
- [x] **Popup interface**
- [x] **Auto-updater** support

## Planned Features
- [ ] **In-app bridge** functionality
- [ ] **In-app swap** functionality
- [ ] **Solana** network integration
- [ ] **Sui** network integration
- [ ] **Hardware wallet** support
- [ ] **Advanced DeFi** integrations
- [ ] **Staking** features
- [ ] **Governance** participation

## ROADMAP COMPARISON (Based on Product Vision)

### COMPLETED FEATURES

#### One Wallet - One Ecosystem
- [x] **Unified asset management L1/L2** - Multi-chain support (Ethereum, Arbitrum, Base, HyperEVM)
- [x] **Swap/bridge/send/receive in one interface** - All functions available in unified UI

#### Token Swap via LiquidSwap
- [x] **LiquidSwap integration** - External link integration in swap drawer
- [ ] **In-app swap execution** - Currently redirects to external DEX

#### Pre-Transaction Gas
- [x] **Real-time gas estimation** - Full implementation with EIP-1559 support
- [x] **Gas cost calculation** - ETH/USD cost display with fallback mechanisms

#### Easy Multichain Integration
- [x] **Alchemy SDK integration** - Complete multi-chain token support
- [x] **Token metadata caching** - Optimized token data management
- [x] **Cross-chain portfolio** - Unified view across networks

#### Hyperliquid Names Transfers
- [x] **@names support** - HL Names API integration
- [x] **Human-readable transfers** - Names displayed in transaction history

#### Developer-First Architecture
- [x] **Modular SDKs** - Clean separation of concerns
- [x] **Contextual signing** - EIP-712 typed data support
- [x] **Cross-surface continuity** - Side panel, popup, offscreen document

#### Developer Mode
- [x] **HyperCore & HyperEVM developer mode** - Testnet support with toggle

### PLANNED FEATURES (Not Yet Implemented)

#### Free Gas Swaps
- [ ] **Gasless swaps** - No HYPE token required
- [ ] **Meta-transaction support** - Gas abstraction layer

#### Token Launcher via LiquidLaunch
- [ ] **In-app token creation** - Integrated token deployment
- [ ] **Instant launch and liquidity setup** - One-click token launch

#### Hyper-Efficient Bridging
- [ ] **One-click auto-bridge** - Direct-to-dApp bridge integration
- [ ] **Auto-handled gas logic** - Smart bridge routing

#### AA Smart Wallet via ZeroDev
- [ ] **EIP-4337 account abstraction** - Smart contract wallets
- [ ] **Session keys and paymasters** - Gasless transaction support
- [ ] **Social recovery** - Multi-sig backup mechanisms

#### Trader-Centric Features
- [ ] **Portfolio & PnL Tracking** - Real-time P&L across chains/protocols
- [ ] **One-Click Leverage Management** - Hyperliquid futures integration
- [ ] **Integrated TradingView/Chart Module** - In-app trading charts

#### Security & UX Enhancements
- [ ] **Multi-Sig & Social Recovery** - Enhanced wallet security
- [ ] **Phishing & Scam Detection** - Contract/link security warnings
- [ ] **Session Signing** - EIP-4337 + session keys for reduced friction

#### Ecosystem Growth Hooks
- [ ] **Referral & Reward System** - Fee rebates or HYPE token rewards
- [ ] **Community Plugin Layer** - Developer mini-app/extension support
- [ ] **Liquidity Incentive Tracker** - Farming, staking, incentive tracking for HyperEVM

### DEVELOPMENT PRIORITIES

#### Phase 1 - Core Infrastructure (Completed)
- Multi-chain wallet functionality
- dApp integration (EIP-1193, EIP-6963, EIP-712)
- Basic DeFi operations (send, receive, portfolio)

#### Phase 2 - Advanced Features (In Progress)
- In-app swap execution
- Advanced bridging
- Enhanced security features

#### Phase 3 - Ecosystem Integration (Planned)
- Account abstraction (AA Smart Wallet)
- Token launcher integration
- Trader-centric tools

#### Phase 4 - Community & Growth (Future)
- Plugin ecosystem
- Referral systems
- Advanced analytics