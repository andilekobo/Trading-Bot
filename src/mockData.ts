export const sampleNotice = 'SAMPLE DATA - NOT CONNECTED TO A LIVE ACCOUNT'

export const sampleAccount = {
  balance: 50000,
  equity: 51240.5,
  dayPnl: 1240.5,
  openPositions: 3,
  winRate: 64.8,
  maxDrawdown: 4.2,
  currency: 'ZAR',
}

export const samplePairs = [
  { symbol: 'EUR/USD', price: 1.08426, change: 0.32 },
  { symbol: 'GBP/USD', price: 1.27184, change: -0.18 },
  { symbol: 'USD/JPY', price: 149.385, change: 0.46 },
  { symbol: 'AUD/USD', price: 0.65372, change: -0.09 },
]

export type Candle = { time: string; open: number; high: number; low: number; close: number }

export function makeCandles(count = 48): Candle[] {
  let previous = 1.081
  return Array.from({ length: count }, (_, index) => {
    const drift = Math.sin(index * 0.46) * 0.0014 + Math.cos(index * 0.19) * 0.00055 + 0.000035
    const open = previous
    const close = open + drift
    const wick = 0.00022 + Math.abs(Math.sin(index * 1.17)) * 0.00048
    previous = close
    return {
      time: `${String(8 + Math.floor(index / 4)).padStart(2, '0')}:${String((index % 4) * 15).padStart(2, '0')}`,
      open,
      high: Math.max(open, close) + wick,
      low: Math.min(open, close) - wick * 0.82,
      close,
    }
  })
}

export const equityHistory = Array.from({ length: 30 }, (_, index) => ({
  day: `${index + 1}`,
  value: 49220 + index * 62 + Math.sin(index * 0.77) * 310 + Math.cos(index * 0.32) * 115,
}))

export const sampleTrades = [
  { time: '19 Oct, 09:42', pair: 'EUR/USD', side: 'Buy', entry: 1.08142, exit: 1.08426, size: 0.18, pnl: 524.8, status: 'Closed', strategy: 'London pullback' },
  { time: '19 Oct, 08:15', pair: 'GBP/USD', side: 'Sell', entry: 1.2746, exit: 1.27184, size: 0.12, pnl: 318.4, status: 'Closed', strategy: 'Range breakout' },
  { time: '18 Oct, 15:30', pair: 'USD/JPY', side: 'Buy', entry: 149.08, exit: 149.385, size: 0.1, pnl: 397.3, status: 'Open', strategy: 'Session momentum' },
  { time: '18 Oct, 13:04', pair: 'EUR/USD', side: 'Sell', entry: 1.08612, exit: 1.08724, size: 0.14, pnl: -184.6, status: 'Closed', strategy: 'London pullback' },
  { time: '18 Oct, 10:22', pair: 'AUD/USD', side: 'Buy', entry: 0.65112, exit: 0.65372, size: 0.2, pnl: 286.2, status: 'Open', strategy: 'Range breakout' },
  { time: '17 Oct, 14:51', pair: 'GBP/USD', side: 'Buy', entry: 1.2682, exit: 1.2668, size: 0.11, pnl: -172.2, status: 'Closed', strategy: 'Session momentum' },
  { time: '17 Oct, 11:18', pair: 'EUR/USD', side: 'Buy', entry: 1.07852, exit: 1.08104, size: 0.16, pnl: 412.7, status: 'Closed', strategy: 'London pullback' },
  { time: '16 Oct, 16:06', pair: 'USD/JPY', side: 'Sell', entry: 149.74, exit: 149.91, size: 0.08, pnl: -96.1, status: 'Closed', strategy: 'Session momentum' },
]

export const samplePositions = [
  { pair: 'EUR/USD', side: 'Buy', entry: 1.08142, current: 1.08426, stop: 1.0789, target: 1.0875, size: 0.18, pnl: 524.8 },
  { pair: 'GBP/USD', side: 'Sell', entry: 1.2746, current: 1.27184, stop: 1.2781, target: 1.2693, size: 0.12, pnl: 318.4 },
  { pair: 'USD/JPY', side: 'Buy', entry: 149.08, current: 149.385, stop: 148.72, target: 149.8, size: 0.1, pnl: 397.3 },
]

export const sampleActivity = [
  { time: '09:42:18', title: 'Position closed', detail: 'EUR/USD buy · +R524.80', kind: 'positive' },
  { time: '09:15:02', title: 'Risk check passed', detail: 'Daily limit usage at 24.8%', kind: 'info' },
  { time: '08:15:44', title: 'Position opened', detail: 'GBP/USD sell · 0.12 lots', kind: 'info' },
  { time: '07:00:00', title: 'Demo session started', detail: 'Simulated feed · no broker connection', kind: 'neutral' },
]
