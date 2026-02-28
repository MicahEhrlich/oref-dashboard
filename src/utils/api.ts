import type { RawAlert } from '../types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://www.oref.org.il'
const ALERTS_PATH =
  import.meta.env.VITE_ALERTS_PATH ?? '/warningMessages/alert/History/AlertsHistory.json'

export async function fetchAlerts(): Promise<RawAlert[]> {
  const url = `${BASE_URL}${ALERTS_PATH}`

  const res = await fetch(url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Referer: BASE_URL,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch alerts: HTTP ${res.status}`)
  }

  const data = await res.json()

  if (!Array.isArray(data)) {
    throw new Error('Unexpected response format — expected an array')
  }

  return data as RawAlert[]
}
