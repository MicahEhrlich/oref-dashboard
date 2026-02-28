import { useState, useEffect, useCallback } from 'react'
import type { NormalizedAlert, CityStats, FetchStatus } from '../types'
import { fetchAlerts } from '../utils/api'
import { normalizeAlerts, buildCityStats, getLatestAlertDate } from '../utils/alerts'

interface UseAlertsReturn {
  alerts: NormalizedAlert[]
  cityStats: CityStats[]
  latestDate: string
  status: FetchStatus
  error: string | null
  refetch: () => void
}

export function useAlerts(): UseAlertsReturn {
  const [alerts, setAlerts] = useState<NormalizedAlert[]>([])
  const [cityStats, setCityStats] = useState<CityStats[]>([])
  const [latestDate, setLatestDate] = useState('')
  const [status, setStatus] = useState<FetchStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const raw = await fetchAlerts()
      const normalized = normalizeAlerts(raw)
      setAlerts(normalized)
      setCityStats(buildCityStats(normalized))
      setLatestDate(getLatestAlertDate(normalized))
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { alerts, cityStats, latestDate, status, error, refetch: load }
}
