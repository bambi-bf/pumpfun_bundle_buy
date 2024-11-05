# PumpFun Bundler README

## Overview

Bundle buy with 16 different wallets in bundle
## Installation

`
npm i pumpdotfun-sdk
`

## Usage Example

First you need to create a `.env` file and set your RPC URL like in the `.env.example`

Then you need to fund an account with atleast 0.004 SOL that is generated when running the command below

`
npx ts-node example/basic/index.ts
`
Example tx link:
https://explorer.jito.wtf/bundle/96cd7b315354afeed1b2610a709b71657e52f2126122d860d4df8da9f675357d

#### buy

```typescript
async buy(
  buyers: Keypair[],
  mint: PublicKey,
  buyAmountSol: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Buys a specified amount of tokens.
- **Parameters**:
  - `buyers`: The Array of buyer.
  - `mint`: The public key of the mint account.
  - `buyAmountSol`: Amount of SOL to buy.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### sell

```typescript
async sell(
  seller: Keypair,
  mint: PublicKey,
  sellTokenAmount: bigint,
  slippageBasisPoints: bigint = 500n,
  priorityFees?: PriorityFee,
  commitment: Commitment = DEFAULT_COMMITMENT,
  finality: Finality = DEFAULT_FINALITY
): Promise<TransactionResult>
```

- Sells a specified amount of tokens.
- **Parameters**:
  - `seller`: The keypair of the seller.
  - `mint`: The public key of the mint account.
  - `sellTokenAmount`: Amount of tokens to sell.
  - `slippageBasisPoints`: Slippage in basis points (default: 500).
  - `priorityFees`: Priority fees (optional).
  - `commitment`: Commitment level (default: DEFAULT_COMMITMENT).
  - `finality`: Finality level (default: DEFAULT_FINALITY).
- **Returns**: A promise that resolves to a `TransactionResult`.

#### addEventListener

```typescript
addEventListener<T extends PumpFunEventType>(
  eventType: T,
  callback: (event: PumpFunEventHandlers[T], slot: number, signature: string) => void
): number
```

- Adds an event listener for the specified event type.
- **Parameters**:
  - `eventType`: The type of event to listen for.
  - `callback`: The callback function to execute when the event occurs.
- **Returns**: An identifier for the event listener.

#### removeEventListener

```typescript
removeEventListener(eventId: number): void
```

- Removes the event listener with the specified identifier.
- **Parameters**:
  - `eventId`: The identifier of the event listener to remove.

### Running the Examples

## Contributing

We welcome contributions! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following this README, you should be able to install the PumpDotFun SDK, run the provided examples, and understand how to set up event listeners and perform token operations.
