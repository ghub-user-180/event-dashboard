import { writeFileSync } from 'fs'
import { join } from 'path'
import {
  scrapeTanzevents,
  scrapeMuevete,
  scrapeLatinPromotion,
  scrapeEcstaticDanceBern,
  scrapeForroAare,
  scrapePlanlos,
  scrapeDanceApp,
} from '../scrapers/tanz-buehne'
import { scrapeSchuur, scrapeJazzkantine } from '../scrapers/ausgehen'
import { scrapeVBG, scrapeSensualityFestival } from '../scrapers/retreats'

async function main() {
  console.log('Starting scrapers...')

  const results = await Promise.allSettled([
    scrapeTanzevents(),
    scrapeMuevete(),
    scrapeLatinPromotion(),
    scrapeEcstaticDanceBern(),
    scrapeForroAare(),
    scrapePlanlos(),
    scrapeDanceApp(),
    scrapeSchuur(),
    scrapeJazzkantine(),
    scrapeVBG(),
    scrapeSensualityFestival(),
  ])

  const names = [
    'tanzevents.ch', 'muevete.ch', 'latinpromotion.ch', 'ecstaticdancebern.ch', 'forroaare.ch',
    'planlos.be', 'danceapp.ch', 'schuur.ch', 'jazzkantine.com', 'vbg.net', 'sensualityfestival.com',
  ]
  const allEvents = results.flatMap((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(`✓ ${names[i]}: ${r.value.length} events`)
      return r.value
    } else {
      console.error(`✗ ${names[i]}: ${r.reason}`)
      return []
    }
  })

  // Deduplicate by id
  const seen = new Set<string>()
  const deduped = allEvents.filter((e) => {
    if (seen.has(e.id)) return false
    seen.add(e.id)
    return true
  })

  // Filter out past events
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const future = deduped.filter((e) => new Date(e.startDate) >= today)

  console.log(`\nTotal: ${future.length} future events (${deduped.length - future.length} past removed)`)

  const outPath = join(process.cwd(), 'data', 'scraped-events.json')
  writeFileSync(outPath, JSON.stringify(future, null, 2), 'utf-8')
  console.log(`Written to ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
