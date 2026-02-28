import styled, { keyframes } from 'styled-components'
import { theme } from '../styles/theme'
import type { NormalizedAlert } from '../types'
import { sortAlertsByDate } from '../utils/alerts'

interface AlertTimelineProps {
  alerts: NormalizedAlert[]
  selectedCity: string | null
}

const Panel = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  grid-column: 1 / -1;
`

const PanelHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PanelTitle = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${theme.colors.muted};
`

const CityBadge = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.orange};
  background: rgba(244, 162, 97, 0.1);
  border: 1px solid rgba(244, 162, 97, 0.3);
  border-radius: 20px;
  padding: 2px 10px;
`

const List = styled.div`
  max-height: 360px;
  overflow-y: auto;
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: none; }
`

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 10px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  animation: ${fadeIn} 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: ${theme.colors.red};
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
`

const Time = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.muted};
  width: 160px;
  flex-shrink: 0;
`

const Desc = styled.div`
  font-size: 13px;
  color: ${theme.colors.text};
  flex: 1;
`

const Empty = styled.div`
  padding: 40px;
  text-align: center;
  color: ${theme.colors.muted};
  font-size: 13px;
`

export function AlertTimeline({ alerts, selectedCity }: AlertTimelineProps) {
  const filtered = selectedCity
    ? alerts.filter(a => a.cities.includes(selectedCity))
    : alerts

  const sorted = sortAlertsByDate(filtered).slice(0, 200)

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Alert Timeline</PanelTitle>
        {selectedCity ? (
          <CityBadge>{selectedCity}</CityBadge>
        ) : (
          <PanelTitle>All Cities</PanelTitle>
        )}
      </PanelHeader>

      <List>
        {sorted.length === 0 ? (
          <Empty>No alerts found</Empty>
        ) : (
          sorted.map(alert => (
            <Item key={`${alert.id}-${alert.alertDate}`}>
              <Dot />
              <Time>{alert.alertDate || '—'}</Time>
              <Desc>{alert.cities.join(', ') || '—'}</Desc>
            </Item>
          ))
        )}
      </List>
    </Panel>
  )
}
