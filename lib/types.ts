export interface Event {
  id: string
  title: string
  startDate: string   // ISO date string, e.g. "2026-10-08"
  endDate?: string
  startTime?: string  // "HH:MM", e.g. "19:00"
  endTime?: string    // "HH:MM", e.g. "22:00"
  location: string
  city?: string
  category: string
  description?: string
  url?: string
  source: 'manual' | 'luma' | 'scraper'
  datesApproximate?: boolean
}

export interface Category {
  id: string
  label: string
  icon: string
  description: string
}

export interface Source {
  id: string
  name: string
  url: string
  bookmarkCategory: string
  dashboardCategory: string | null
  type: 'api' | 'scraper' | 'manual' | 'none'
  status: 'active' | 'pending' | 'no-event-relevance'
  notes?: string
}
