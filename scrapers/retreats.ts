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
        endDate: endDate && endDate !== startDate ? endDate : undefined,
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

// ── Sensuality Festival ──────────────────────────────────────────────────────
// sensualityfestival.com — single annual event, date in page text
// Format: "DD-DD Month, YYYY" (e.g. "15-22 August, 2026")

const SENSUALITY_MONTHS: Record<string, string> = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
}

export async function scrapeSensualityFestival(): Promise<Event[]> {
  try {
    const res = await fetch('https://www.sensualityfestival.com', { headers: HEADERS })
    if (!res.ok) return []
    const html = await res.text()

    const match = html.match(/(\d{1,2})-(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)[,\s]+(\d{4})/i)
    if (!match) return []

    const startDay = match[1].padStart(2, '0')
    const endDay = match[2].padStart(2, '0')
    const month = SENSUALITY_MONTHS[match[3].toLowerCase()]
    const year = match[4]

    return [{
      id: `sensuality-festival-${year}`,
      title: 'Sensuality Festival',
      startDate: `${year}-${month}-${startDay}`,
      endDate: `${year}-${month}-${endDay}`,
      location: 'Czech Republic',
      city: 'Czech Republic',
      category: 'retreats',
      description: 'Non-tantra festival about sexuality, relationships & body awareness.',
      url: 'https://www.sensualityfestival.com',
      source: 'scraper',
    }]
  } catch (e) {
    console.error('sensualityfestival.com error:', e)
    return []
  }
}
