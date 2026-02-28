import styled from 'styled-components'
import { theme } from '../styles/theme'

interface HourlyChartProps {
  buckets: number[]
  selectedCity: string | null
}

const Panel = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
`

const PanelHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${theme.colors.border};
`

const PanelTitle = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${theme.colors.muted};
`

const ChartWrap = styled.div`
  padding: 24px;
`

const Bars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 120px;
`

const BarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 4px;
  cursor: default;

  &:hover > div:first-child {
    opacity: 0.7;
  }
`

const BarFill = styled.div<{ $height: number }>`
  width: 100%;
  height: ${p => p.$height}px;
  min-height: 2px;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, ${theme.colors.red}, #7a1020);
  transition: opacity 0.2s;
`

const BarLabel = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 9px;
  color: ${theme.colors.muted};
  transform: rotate(-45deg);
  white-space: nowrap;
`

const Tooltip = styled.div`
  position: absolute;
  background: ${theme.colors.surface2};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  padding: 4px 8px;
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.text};
  pointer-events: none;
  white-space: nowrap;
`

export function HourlyChart({ buckets, selectedCity }: HourlyChartProps) {
  const max = Math.max(...buckets, 1)

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Alerts by Hour of Day
          {selectedCity && ` — ${selectedCity}`}
        </PanelTitle>
      </PanelHeader>
      <ChartWrap>
        <Bars>
          {buckets.map((count, hour) => (
            <BarCol key={hour} title={`${String(hour).padStart(2, '0')}:00 — ${count} alerts`}>
              <BarFill $height={Math.max(2, Math.round((count / max) * 110))} />
              <BarLabel>{String(hour).padStart(2, '0')}</BarLabel>
            </BarCol>
          ))}
        </Bars>
      </ChartWrap>
    </Panel>
  )
}
