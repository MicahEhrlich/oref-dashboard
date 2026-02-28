import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { CityStats, NormalizedAlert } from '../types'

interface StatsRowProps {
  alerts: NormalizedAlert[]
  cityStats: CityStats[]
}

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`

const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: 20px 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.colors.red};
  }
`

const Label = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${theme.colors.muted};
  font-family: ${theme.fonts.mono};
  margin-bottom: 8px;
`

const Value = styled.div<{ $small?: boolean }>`
  font-family: ${theme.fonts.mono};
  font-size: ${p => (p.$small ? '18px' : 'clamp(24px, 4vw, 36px)')};
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1;
`

export function StatsRow({ alerts, cityStats }: StatsRowProps) {
  const topCity = cityStats[0]

  return (
    <Row>
      <Card>
        <Label>Total Alerts</Label>
        <Value>{alerts.length.toLocaleString()}</Value>
      </Card>
      <Card>
        <Label>Cities Affected</Label>
        <Value>{cityStats.length.toLocaleString()}</Value>
      </Card>
      <Card>
        <Label>Most Targeted</Label>
        <Value $small>{topCity?.city ?? '—'}</Value>
      </Card>
      <Card>
        <Label>Top City Alerts</Label>
        <Value>{topCity?.count.toLocaleString() ?? '—'}</Value>
      </Card>
    </Row>
  )
}
