import { useState } from 'react'
import { makeCandles, equityHistory, samplePairs, type Candle } from './mockData'

export function EquityChart({ range = '1M' }: { range?: string }) {
  const count = range === '1W' ? 7 : range === '3M' ? 30 : 20
  const points = equityHistory.slice(-count).map((point) => point.value)
  const width = 680
  const height = 220
  const padX = 6
  const padY = 12
  const min = Math.min(...points) - 100
  const max = Math.max(...points) + 100
  const coords = points.map((value, index) => ({
    x: padX + (index / Math.max(points.length - 1, 1)) * (width - padX * 2),
    y: padY + (1 - (value - min) / (max - min)) * (height - padY * 2),
  }))
  const line = coords.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ')
  const area = `${line} L${width - padX},${height - padY} L${padX},${height - padY} Z`

  return <svg className="equity-chart-svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Illustrative account equity chart, ${range} range`} preserveAspectRatio="none">
    <defs><linearGradient id="equity-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity=".2" /><stop offset="100%" stopColor="#D4AF37" stopOpacity="0" /></linearGradient></defs>
    {[0, 1, 2, 3].map((index) => <line key={index} x1="0" x2={width} y1={padY + index * ((height - padY * 2) / 3)} y2={padY + index * ((height - padY * 2) / 3)} className="chart-grid-line" />)}
    <path d={area} fill="url(#equity-fill)" />
    <path d={line} fill="none" className="equity-chart-line" />
    {coords.filter((_, index) => index === coords.length - 1).map((point) => <circle key={point.x} cx={point.x} cy={point.y} r="4" className="equity-chart-end" />)}
  </svg>
}

export function CandleChart({ pair = 'EUR/USD' }: { pair?: string }) {
  const [interval, setInterval] = useState('15m')
  const [hoveredCandle, setHoveredCandle] = useState<{ candle: Candle; index: number } | null>(null)
  const candleCount: Record<string, number> = { '5m': 48, '15m': 36, '1h': 24, '4h': 12 }
  const rawCandles = makeCandles(candleCount[interval])
  const currentPrice = samplePairs.find((item) => item.symbol === pair)?.price ?? rawCandles.at(-1)?.close ?? 1
  const basePrice = rawCandles.at(-1)?.close ?? 1
  const pairScale = currentPrice / basePrice
  const candles = rawCandles.map((candle) => ({
    time: candle.time,
    open: candle.open * pairScale,
    high: candle.high * pairScale,
    low: candle.low * pairScale,
    close: candle.close * pairScale,
  }))
  const width = 700
  const height = 245
  const left = 52
  const right = 8
  const top = 12
  const bottom = 25
  const values = candles.flatMap((candle) => [candle.high, candle.low])
  const min = Math.min(...values)
  const max = Math.max(...values)
  const chartHeight = height - top - bottom
  const chartWidth = width - left - right
  const y = (value: number) => top + ((max - value) / (max - min)) * chartHeight
  const step = chartWidth / candles.length
  const precision = pair === 'USD/JPY' ? 3 : 5

  return <div className="candle-chart-wrap" onMouseLeave={() => setHoveredCandle(null)}>
    <div className="chart-controls" role="group" aria-label="Chart timeframe">{['5m', '15m', '1h', '4h'].map((value) => <button className={interval === value ? 'chart-control active' : 'chart-control'} key={value} onClick={() => setInterval(value)}>{value}</button>)}</div>
    {hoveredCandle && <div className="candle-tooltip" role="status"><strong>{pair} <span>{hoveredCandle.candle.time}</span></strong><div><span>Open <b>{hoveredCandle.candle.open.toFixed(precision)}</b></span><span>High <b>{hoveredCandle.candle.high.toFixed(precision)}</b></span><span>Low <b>{hoveredCandle.candle.low.toFixed(precision)}</b></span><span>Close <b>{hoveredCandle.candle.close.toFixed(precision)}</b></span></div></div>}
    <svg className="candle-chart-svg" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Simulated ${pair} candlestick chart, ${interval} timeframe`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const value = max - index * ((max - min) / 4)
        const lineY = y(value)
        return <g key={index}><line x1={left} x2={width - right} y1={lineY} y2={lineY} className="chart-grid-line" /><text x="0" y={lineY + 3} className="chart-axis-label">{value.toFixed(precision)}</text></g>
      })}
      {candles.map((candle, index) => {
        const x = left + index * step + step * 0.5
        const rising = candle.close >= candle.open
        const bodyTop = y(Math.max(candle.open, candle.close))
        const bodyBottom = y(Math.min(candle.open, candle.close))
        return <g key={candle.time} className={rising ? 'candle bullish' : 'candle bearish'} onMouseEnter={() => setHoveredCandle({ candle, index })} onFocus={() => setHoveredCandle({ candle, index })} onBlur={() => setHoveredCandle(null)} tabIndex={0} aria-label={`${pair}, ${candle.time}. Open ${candle.open.toFixed(precision)}, high ${candle.high.toFixed(precision)}, low ${candle.low.toFixed(precision)}, close ${candle.close.toFixed(precision)}`}><title>{`${pair} ${candle.time} | O ${candle.open.toFixed(precision)} H ${candle.high.toFixed(precision)} L ${candle.low.toFixed(precision)} C ${candle.close.toFixed(precision)}`}</title><line x1={x} x2={x} y1={y(candle.high)} y2={y(candle.low)} className="candle-wick" /><rect x={x - Math.max(2, step * 0.28)} y={bodyTop} width={Math.max(3, step * 0.56)} height={Math.max(1.5, bodyBottom - bodyTop)} rx=".7" className="candle-body" /></g>
      })}
      {hoveredCandle && <line x1={left + hoveredCandle.index * step + step * 0.5} x2={left + hoveredCandle.index * step + step * 0.5} y1={top} y2={height - bottom} className="chart-crosshair" />}
      <line x1={left} x2={width - right} y1={y(currentPrice)} y2={y(currentPrice)} className="current-price-line" />
      <text x={width - right - 2} y={y(currentPrice) - 5} textAnchor="end" className="current-price-label">{currentPrice.toFixed(precision)}</text>
      {[0, 12, 24, 36, 47].map((index) => <text key={index} x={left + index * step} y={height - 5} className="chart-axis-label">{candles[index].time}</text>)}
    </svg>
  </div>
}

export function MiniSparkline({ positive }: { positive: boolean }) {
  const values = positive ? [12, 10, 13, 8, 10, 6, 8, 3, 5, 1] : [2, 5, 3, 8, 6, 10, 8, 11, 10, 14]
  const path = values.map((value, index) => `${index === 0 ? 'M' : 'L'}${(index / (values.length - 1)) * 100},${value * 2}`).join(' ')
  return <svg className={`mini-sparkline ${positive ? 'positive' : 'negative'}`} viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true"><path d={path} fill="none" /></svg>
}
