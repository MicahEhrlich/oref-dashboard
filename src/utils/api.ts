import type { RawAlert } from '../types'

// Use same-origin proxy to avoid CORS (Vercel serverless in prod, Vite proxy in dev)
const ALERTS_URL = '/api/alerts'

export async function fetchAlerts(): Promise<RawAlert[]> {
  const res = await fetch(ALERTS_URL)

  if (!res.ok) {
    throw new Error(`Failed to fetch alerts: HTTP ${res.status}`)
  }

  const data = await res.json()

  if (!Array.isArray(data)) {
    throw new Error('Unexpected response format — expected an array')
  }

  return data as RawAlert[]
}
