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

export function sortAlertsByDate(alerts: NormalizedAlert[], direction: 'asc' | 'desc' = 'desc') {
  return [...alerts].sort((a, b) => {
    const cmp = a.alertDate.localeCompare(b.alertDate)
    return direction === 'desc' ? -cmp : cmp
  })
}

export function getLatestAlertDate(alerts: NormalizedAlert[]): string {
  return alerts.reduce((latest, a) => (a.alertDate > latest ? a.alertDate : latest), '')
}
