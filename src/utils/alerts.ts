import type { RawAlert, NormalizedAlert, CityStats } from '../types'

export function normalizeAlerts(raw: RawAlert[]): NormalizedAlert[] {
  return raw.map((alert, index) => ({
    id: alert.id ?? String(index),
    alertDate: alert.alertDate ?? '',
    title: alert.title ?? '',
    cities: Array.isArray(alert.data) ? alert.data : alert.data ? [alert.data] : [],
    category: alert.category ?? 1,
  }))
}

export function buildCityStats(alerts: NormalizedAlert[]): CityStats[] {
  const map = new Map<string, NormalizedAlert[]>()

  for (const alert of alerts) {
    for (const city of alert.cities) {
      if (!city) continue
      const existing = map.get(city) ?? []
      existing.push(alert)
      map.set(city, existing)
    }
  }

  return Array.from(map.entries())
    .map(([city, cityAlerts]) => ({ city, count: cityAlerts.length, alerts: cityAlerts }))
    .sort((a, b) => b.count - a.count)
}

export function buildHourlyBuckets(alerts: NormalizedAlert[]): number[] {
  const hours = new Array<number>(24).fill(0)
  for (const alert of alerts) {
    const match = alert.alertDate.match(/(\d{2}):(\d{2})/)
    if (match) {
      hours[parseInt(match[1], 10)]++
    }
  }
  return hours
}

function parseAlertDateToTime(alertDate: string): number {
  if (!alertDate) return 0

  // Try native Date parsing first (handles ISO-like formats)
  const iso = new Date(alertDate)
  if (!Number.isNaN(iso.getTime())) {
    return iso.getTime()
  }

  // Try common dd/MM/yyyy HH:mm:ss format
  const match = alertDate.match(
    /(\d{2})\/(\d{2})\/(\d{4})[^\d]*(\d{2}):(\d{2}):(\d{2})/
  )
  if (match) {
    const [, dd, MM, yyyy, hh, mm, ss] = match
    const coerced = new Date(
      `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`
    )
    if (!Number.isNaN(coerced.getTime())) {
      return coerced.getTime()
    }
  }

  return 0
}

export function sortAlertsByDate(
  alerts: NormalizedAlert[],
  direction: 'asc' | 'desc' = 'desc'
) {
  return [...alerts].sort((a, b) => {
    const ta = parseAlertDateToTime(a.alertDate)
    const tb = parseAlertDateToTime(b.alertDate)
    const cmp = ta - tb
    return direction === 'desc' ? -cmp : cmp
  })
}

export function getLatestAlertDate(alerts: NormalizedAlert[]): string {
  if (alerts.length === 0) return ''
  const sorted = sortAlertsByDate(alerts, 'desc')
  return sorted[0]?.alertDate ?? ''
}
