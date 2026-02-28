import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'

import { useAlerts } from './hooks/useAlerts'
import { buildHourlyBuckets } from './utils/alerts'

import { Header } from './components/Header'
import { StatsRow } from './components/StatsRow'
import { ChampionCard } from './components/ChampionCard'
import { CityRankings } from './components/CityRankings'
import { HourlyChart } from './components/HourlyChart'
import { AlertTimeline } from './components/AlertTimeline'
import { LoadingState, ErrorState } from './components/StateMessages'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export default function App() {
  const { alerts, cityStats, latestDate, status, error, refetch } = useAlerts()
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const filteredAlerts = useMemo(
    () =>
      selectedCity ? alerts.filter(a => a.cities.includes(selectedCity)) : alerts,
    [alerts, selectedCity]
  )

  const hourlyBuckets = useMemo(
    () => buildHourlyBuckets(filteredAlerts),
    [filteredAlerts]
  )

  const topCity = cityStats[0]

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header
          latestDate={latestDate}
          onRefetch={refetch}
          loading={status === 'loading'}
        />

        {status === 'loading' && <LoadingState />}

        {status === 'error' && error && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {status === 'success' && (
          <>
            <StatsRow alerts={alerts} cityStats={cityStats} />

            {topCity && <ChampionCard topCity={topCity} />}

            <MainGrid>
              <CityRankings
                cityStats={cityStats}
                selectedCity={selectedCity}
                onSelectCity={setSelectedCity}
              />
              <HourlyChart buckets={hourlyBuckets} selectedCity={selectedCity} />
            </MainGrid>

            <AlertTimeline alerts={alerts} selectedCity={selectedCity} />
          </>
        )}
      </Container>
    </>
  )
}
