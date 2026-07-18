# MARGIN ▲

**Your bag is buying power.** Web-first lending on Solana: borrow SOL against memecoins
(up to 30% LTV) and tokenized stocks (up to 70% LTV, 30-day terms) — without selling.

- **Two asset classes** — memecoins & majors, plus Backed xStocks (AAPL, NVDA, TSLA, SPY, gold…)
- **Auto-protect** — arm take-profits and stop-losses on collateral *while it's pledged*; a 15-second keeper executes them
- **Credit that compounds** — on-chain score 0–1000; clean repays unlock higher LTV and lower fees (Retail → Funded → Prime)
- **The Desk** — an AI credit engine that reads your bag and structures your optimal loan; the AI proposes, deterministic rules enforce
- **Receipts for everything** — every borrow, auto-sell, liquidation, and fee split is a public, streamed receipt
- **Non-custodial by design** — wallet connect reads your address only; no signature is ever requested

## Status

**Paper protocol.** Prices and wallet balance reads are live from mainnet; loans, balances, and
settlement are simulated until the on-chain program is audited. `$MARGIN` is a memecoin with no
promise of value, yield, or profit.

## Run

```
node server/index.js     # port 8154
```

Dependency-free Node (>= 18). Optional env:

| Var | Purpose |
| --- | --- |
| `PORT` | listen port (default 8154) |
| `DATA_PATH` | persistence file (default `./data.json`) |
| `MARGIN_MINT` | $MARGIN contract address — enables the CA pill on the landing |
| `RPC_URL` | Solana RPC for real wallet balance reads |
| `ANTHROPIC_API_KEY` | activates The Desk (AI credit engine) |
| `DESK_MODEL` | override The Desk's model |

## Fee split

70% $MARGIN holders · 20% LP pool · 5% referrals · 5% protocol — accrual on the ledger from day one.
