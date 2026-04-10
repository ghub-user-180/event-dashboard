import * as cheerio from 'cheerio'
import type { Event } from '../lib/types'

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

function stableId(prefix: string, title: string, date: string): string {
  const raw = `${prefix}-${title}-${date}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return raw.slice(0, 80)
}

const MONTH_MAP: Record<string, string> = {
  jan: '01', feb: '02', mar: '03', mär: '03', apr: '04', mai: '05', may: '05',
  jun: '06', jul: '07', aug: '08', sep: '09', okt: '10', oct: '10', nov: '11', dez: '12', dec: '12',
}

function vbgDate(year: string, monthAbbr: string, day: string): string | null {
  const m = MONTH_MAP[monthAbbr.toLowerCase().replace(/[^a-zä]/g, '').slice(0, 3)]
  if (!m) return null
  return `${year}-${m}-${day.replace('-', '').padStart(2, '0')}`
}

// ── VBG Agenda (Auszeiten / Retreats) ──────────────────────────────────────
// vbg.net/agenda — server-side rendered, .kItem containers

export async function scrapeVBG(): Promise<Event[]> {
  try {
    const res = await fetch('https://www.vbg.net/agenda', { headers: HEADERS })
    if (!res.ok) return []
    const html = await res.text()
    const $ = cheerio.load(html)
    const events: Event[] = []

    // Only take "Auszeiten" calendar (retreats/getaways), skip pure Anlässe
    $('.kItem').each((_, el) => {
      const $el = $(el)
      const calLabel = $el.attr('data-cal-label') ?? ''
      // Include Auszeiten (retreats) and Kurse; skip single-evening Anlässe
      if (!['Auszeiten', 'Kurse', 'Seminare', 'Ferien'].some(k => calLabel.includes(k))) return

      // Year+month from data-date e.g. "202604"
      const dataDate = $el.attr('data-date') ?? ''
      const dataDate2 = $el.attr('data-date2') ?? ''
      const year = dataDate.slice(0, 4)
      if (!year) return

      const startDay = $el.find('.startdate .day').text().trim()
      const startMonth = $el.find('.startdate .month').text().trim()
      const startDate = vbgDate(year, startMonth, startDay)
      if (!startDate) return

      // End date (multi-day events)
      const endDay = $el.find('.enddate .day').text().trim()
      const endMonth = $el.find('.enddate .month').text().trim()
      const endYear = dataDate2.slice(0, 4) || year
      const endDate = endDay ? vbgDate(endYear, endMonth || startMonth, endDay) : undefined

      // Title: first text node of .title, before the hidden span
      const titleNode = $el.find('.title').contents().filter((_, n) => n.type === 'text').first()
      const title = titleNode.text().trim()
      if (!title) return

      // URL
      const href = $el.find('a.goSingle').attr('href') ?? ''
      const url = href ? `https://www.vbg.net${href}` : 'https://www.vbg.net/agenda'

      const location = $el.attr('data-place') || 'Schweiz'

      events.push({
        id: stableId('vbg', title, startDate),
        title,
        startDate,
        endDate: endDate !== startDate ? endDate : undefined,
        location,
        city: location.split(',')[0].trim() || 'Schweiz',
        category: 'retreats',
        url,
        source: 'scraper',
      })
    })

    return events
  } catch (e) {
    console.error('vbg.net error:', e)
    return []
  }
}
