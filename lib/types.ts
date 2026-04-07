export interface Event {
  id: string
  title: string
  startDate: string   // ISO date string, e.g. "2026-10-08"
  endDate?: string
  location: string
  city?: string
  category: string
  description?: string
  url?: string
  source: 'manual' | 'luma'
  datesApproximate?: boolean
}

export interface Category {
  id: string
  label: string
  icon: string
  description: string
}
