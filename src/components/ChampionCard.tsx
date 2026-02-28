import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { CityStats } from '../types'

interface ChampionCardProps {
  topCity: CityStats
}

const Card = styled.div`
  background: linear-gradient(135deg, #1a0810 0%, #2a0e1a 50%, #1a0810 100%);
  border: 1px solid ${theme.colors.red};
  border-radius: ${theme.radius.lg};
  padding: 32px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(230, 57, 70, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }
`

const Rank = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 72px;
  font-weight: 700;
  color: ${theme.colors.red};
  opacity: 0.25;
  line-height: 1;
  flex-shrink: 0;
  user-select: none;
`

const Info = styled.div`
  flex: 1;
  min-width: 200px;
  position: relative;
  z-index: 1;
`

const BadgeLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${theme.colors.red};
  font-family: ${theme.fonts.mono};
  margin-bottom: 8px;
`

const CityName = styled.div`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 8px;
`

const CountLine = styled.div`
  font-family: ${theme.fonts.mono};
  font-size: 14px;
  color: ${theme.colors.muted};

  strong {
    color: ${theme.colors.text};
  }
`

export function ChampionCard({ topCity }: ChampionCardProps) {
  return (
    <Card>
      <Rank>#1</Rank>
      <Info>
        <BadgeLabel>Most Targeted City</BadgeLabel>
        <CityName>{topCity.city}</CityName>
        <CountLine>
          <strong>{topCity.count.toLocaleString()}</strong> alerts recorded
        </CountLine>
      </Info>
    </Card>
  )
}
