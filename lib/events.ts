import type { Event } from './types'
import manualEvents from '@/data/manual-events.json'

// Returns only future events, sorted by startDate
export function getFutureEvents(events: Event[]): Event[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return events
    .filter((e) => new Date(e.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

export function isWithinDays(dateStr: string, days: number): boolean {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= days
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  if (!endDate) return start.toLocaleDateString('de-CH', opts)

  const end = new Date(endDate)
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()}. ${start.toLocaleDateString('de-CH', { month: 'short', year: 'numeric' })}`
  }
  return `${start.toLocaleDateString('de-CH', opts)} – ${end.toLocaleDateString('de-CH', opts)}`
}

// Fetch events from Luma public API (requires LUMA_API_KEY env var)
async function fetchLumaEvents(): Promise<Event[]> {
  const apiKey = process.env.LUMA_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(
      'https://api.lu.ma/public/v1/discover/search?geo_latitude=46.9480&geo_longitude=7.4474&geo_radius_meters=50000',
      {
        headers: { 'x-luma-api-key': apiKey },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.events ?? []).map((item: any): Event => {
      const e = item.event ?? item
      return {
        id: `luma-${e.api_id ?? e.id}`,
        title: e.name ?? e.title ?? 'Unbekannt',
        startDate: (e.start_at ?? e.start_date ?? '').split('T')[0],
        endDate: e.end_at ? e.end_at.split('T')[0] : undefined,
        location: e.geo_address_json?.description ?? e.location ?? 'Schweiz',
        city: e.geo_address_json?.city ?? '',
        category: 'sozialleben',
        description: e.description ?? '',
        url: e.url ? `https://lu.ma/${e.url}` : 'https://lu.ma/discover',
        source: 'luma',
      }
    })
  } catch {
    return []
  }
}

// Main: returns all upcoming events merged from all sources
export async function getAllEvents(): Promise<Event[]> {
  const [luma] = await Promise.all([fetchLumaEvents()])
  const all = [...(manualEvents as Event[]), ...luma]
  return getFutureEvents(all)
}

// Returns upcoming events for a specific category
export async function getEventsByCategory(categoryId: string): Promise<Event[]> {
  const all = await getAllEvents()
  return all.filter((e) => e.category === categoryId)
}

// Generate an ICS string for a single event
export function generateICS(event: Event): string {
  const uid = `${event.id}@event-dashboard`
  const dtstart = event.startDate.replace(/-/g, '')
  const dtend = event.endDate ? event.endDate.replace(/-/g, '') : dtstart
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const escape = (s: string) => s.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Event Dashboard//DE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DTEND;VALUE=DATE:${dtend}`,
    `SUMMARY:${escape(event.title)}`,
    event.description ? `DESCRIPTION:${escape(event.description)}` : '',
    `LOCATION:${escape(event.location)}`,
    event.url ? `URL:${event.url}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')
}
