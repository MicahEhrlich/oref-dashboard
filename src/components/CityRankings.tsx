import { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { CityStats } from '../types'
import { useDebounce } from '../hooks/useDebounce'

interface CityRankingsProps {
  cityStats: CityStats[]
  selectedCity: string | null
  onSelectCity: (city: string | null) => void
}

const Panel = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const PanelHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`

const PanelTitle = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${theme.colors.muted};
`

const SearchWrap = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`

const SearchInput = styled.input`
  width: 100%;
  background: ${theme.colors.surface2};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.sm};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.sans};
  font-size: 13px;
  padding: 8px 12px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.colors.red};
  }

  &::placeholder {
    color: ${theme.colors.muted};
  }
`

const List = styled.div`
  overflow-y: auto;
  flex: 1;
  max-height: 420px;
`

const CityRow = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: background 0.15s;
  background: ${p => (p.$selected ? 'rgba(230, 57, 70, 0.1)' : 'transparent')};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(230, 57, 70, 0.06);
  }
`

const RankNum = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  color: ${theme.colors.muted};
  width: 24px;
  text-align: right;
  flex-shrink: 0;
`

const CityName = styled.span`
  flex: 1;
  font-size: 14px;
`

const BarWrap = styled.div`
  width: 80px;
  flex-shrink: 0;
`

const BarBg = styled.div`
  background: ${theme.colors.border};
  border-radius: 2px;
  height: 4px;
  overflow: hidden;
`

const BarFill = styled.div<{ $pct: number }>`
  height: 100%;
  border-radius: 2px;
  width: ${p => p.$pct}%;
  background: linear-gradient(90deg, ${theme.colors.red}, ${theme.colors.orange});
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
`

const CountNum = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.text};
  width: 36px;
  text-align: right;
  flex-shrink: 0;
`

export function CityRankings({ cityStats, selectedCity, onSelectCity }: CityRankingsProps) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const maxCount = cityStats[0]?.count ?? 1

  const filtered = debouncedSearch
    ? cityStats.filter(s => s.city.toLowerCase().includes(debouncedSearch.toLowerCase()))
    : cityStats

  const visible = filtered.slice(0, 50)

  const handleRowClick = (city: string) => {
    onSelectCity(selectedCity === city ? null : city)
  }

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>City Rankings</PanelTitle>
        <PanelTitle>{cityStats.length} cities</PanelTitle>
      </PanelHeader>

      <SearchWrap>
        <SearchInput
          type="search"
          placeholder="Search cities…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </SearchWrap>

      <List>
        {visible.map(({ city, count }, idx) => {
          const globalRank = cityStats.findIndex(s => s.city === city) + 1
          return (
            <CityRow
              key={city}
              $selected={selectedCity === city}
              onClick={() => handleRowClick(city)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleRowClick(city)}
              aria-pressed={selectedCity === city}
            >
              <RankNum>{globalRank}</RankNum>
              <CityName>{city}</CityName>
              <BarWrap>
                <BarBg>
                  <BarFill $pct={Math.round((count / maxCount) * 100)} />
                </BarBg>
              </BarWrap>
              <CountNum>{count}</CountNum>
            </CityRow>
          )
        })}

        {visible.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: theme.colors.muted, fontSize: '13px' }}>
            No cities found
          </div>
        )}
      </List>
    </Panel>
  )
}
