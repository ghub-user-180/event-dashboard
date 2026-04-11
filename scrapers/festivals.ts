import type { Event } from '../lib/types'

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

function stableId(prefix: string, title: string, date: string): string {
  const raw = `${prefix}-${title}-${date}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return raw.slice(0, 80)
}

// ── Bitvocation – Bitcoin Conferences ────────────────────────────────────────
// bitvocation.com — JSON-LD ItemList (HTML-entity-encoded inside script tag)
// 69 global Bitcoin conferences with startDate + location

export async function scrapeBitvocation(): Promise<Event[]> {
  try {
    const res = await fetch(
      'https://bitvocation.com/bitcoin-conferences-discounts',
      { headers: HEADERS }
    )
    if (!res.ok) return []
    const html = await res.text()

    // JSON-LD is in a <script children="..."> attribute (Nuxt.js pattern),
    // HTML-entity-encoded. Extract the attribute value.
    const scriptMatch = html.match(/<script[^>]+type="application\/ld\+json"[^>]+children="({[^]*?})"/)
    if (!scriptMatch) return []

    const jsonStr = decodeHtmlEntities(scriptMatch[1])

    let data: { itemListElement?: Array<{ item?: Record<string, unknown> }> }
    try {
      data = JSON.parse(jsonStr)
    } catch {
      return []
    }

    const items = data.itemListElement ?? []
    const events: Event[] = []

    for (const item of items) {
      const e = item.item ?? {}
      const name = e.name as string | undefined
      const startDate = e.startDate as string | undefined
      const url = e.url as string | undefined
      if (!name || !startDate) continue

      const loc = e.location as Record<string, unknown> | undefined
      const addr = (loc?.address ?? {}) as Record<string, unknown>
      const city = (addr.addressLocality ?? '') as string
      const country = (addr.addressCountry ?? '') as string
      const locationName = (loc?.name as string | undefined) ?? [city, country].filter(Boolean).join(', ')

      events.push({
        id: stableId('bitvocation', name, startDate),
        title: name,
        startDate,
        location: locationName || 'TBA',
        city,
        category: 'festivals-konferenzen',
        url: url ?? 'https://bitvocation.com/bitcoin-conferences-discounts',
        source: 'scraper',
      })
    }

    return events
  } catch (e) {
    console.error('bitvocation.com error:', e)
    return []
  }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}
