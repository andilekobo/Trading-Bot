# Trading-Bot
KasiTrade Automation — Forex Trading Bot

## Frontend

The repository currently contains a Vite + React + TypeScript interface. To run it locally:

```sh
npm install
npm run dev
```

Run `npm run build` to type-check and create a production build in `dist/`.

The UI intentionally shows account metrics and performance as unavailable until a verified MT5 service supplies real data. Trading controls, connection setup, and backtests are disabled until their backend integrations exist. Strategy and risk inputs are drafts only; risk limits must be validated and enforced by the backend before automation is enabled.
