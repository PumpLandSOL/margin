# MARGIN ▲

**$MARGIN** (Robinhood Chain): `0x1c65735d7403fca44af532b078cef892121f8888`

**Your bag is buying power.** Web-first lending on **Robinhood Chain**: borrow ETH against
tokenized stocks (up to 70% LTV, 30-day terms) and Robinhood-native memecoins (up to 30% LTV) — without selling.

- **Stocks, majors, natives** — tokenized stocks/ETFs/metals marked to real Pyth equity feeds (AAPL, NVDA, TSLA, SPY, gold…), crypto majors on Pyth crypto feeds (BTC, DOGE, XRP), and Robinhood Chain natives priced from their deepest pools (QUANT, INDEX, JUGGERNAUT, CASHCAT)
- **Auto-protect** — arm take-profits and stop-losses on collateral *while it's pledged*; a 15-second keeper executes them
- **Credit that compounds** — on-chain score 0–1000; clean repays unlock higher LTV and lower fees (Retail → Funded → Prime)
- **The Desk** — an AI credit engine that reads your bag and structures your optimal loan; the AI proposes, deterministic rules enforce
- **Receipts for everything** — every borrow, auto-sell, liquidation, and fee split is a public, streamed receipt
- **Non-custodial by design** — wallet connect reads your address only; no signature is ever requested

## Status

**Beta.** Prices and wallet balance reads are live from mainnet; loans, balances, and
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
| `RH_RPC_URL` | Robinhood Chain RPC for real wallet balance reads (default: public mainnet RPC) |
| `ANTHROPIC_API_KEY` | activates The Desk (AI credit engine) |
| `DESK_MODEL` | override The Desk's model |

## Fee split

70% $MARGIN holders · 20% LP pool · 5% referrals · 5% protocol — accrual on the ledger from day one.
