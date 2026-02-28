export interface RawAlert {
  alertDate: string
  title: string
  data: string | string[]
  category?: number
  id?: string
}

export interface NormalizedAlert {
  id: string
  alertDate: string
  title: string
  cities: string[]
  category: number
}

export interface CityStats {
  city: string
  count: number
  alerts: NormalizedAlert[]
}

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error'
