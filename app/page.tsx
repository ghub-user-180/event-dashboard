import Link from 'next/link'
import { getAllEvents, isWithinDays, formatDateRange } from '@/lib/events'
import { CATEGORIES } from '@/lib/categories'
import type { Event } from '@/lib/types'

export const revalidate = 3600 // rebuild every hour

export default async function DashboardPage() {
  const allEvents = await getAllEvents()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Dashboard</h1>
          <p className="text-gray-500 mt-1">Nächste Events auf einen Blick</p>
        </div>
        <Link
          href="/monitoring"
          className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 hover:border-gray-300 rounded-lg px-3 py-1.5 transition mt-1"
        >
          ⚙ Quellen
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const catEvents = allEvents.filter((e) => e.category === cat.id)
          const events = catEvents.slice(0, 3)
          return <CategoryTile key={cat.id} id={cat.id} icon={cat.icon} label={cat.label} description={cat.description} events={events} totalCount={catEvents.length} />
        })}
      </div>
    </div>
  )
}

function CategoryTile({
  id,
  icon,
  label,
  description,
  events,
  totalCount,
}: {
  id: string
  icon: string
  label: string
  description: string
  events: Event[]
  totalCount: number
}) {
  const hasSoon = events.some((e) => isWithinDays(e.startDate, 7))

  return (
    <Link href={`/${id}`} className="block group">
      <div
        className={`bg-white rounded-xl border p-4 h-full transition hover:shadow-md hover:border-gray-300 ${
          hasSoon ? 'border-amber-400' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{icon}</span>
          <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{label}</h2>
          <div className="ml-auto flex items-center gap-1.5">
            {totalCount > 0 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                {totalCount}
              </span>
            )}
            {hasSoon && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                bald
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-3">{description}</p>

        {events.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Keine Events geplant</p>
        ) : (
          <ul className="space-y-2">
            {events.map((e) => (
              <li key={e.id} className="text-sm">
                <div
                  className={`font-medium leading-snug ${
                    isWithinDays(e.startDate, 7) ? 'text-amber-700' : 'text-gray-800'
                  }`}
                >
                  {e.title}
                </div>
                <div className="text-xs text-gray-400 flex gap-2">
                  <span>{formatDateRange(e.startDate, e.endDate, e.startTime, e.endTime)}</span>
                  {e.city && <span>· {e.city}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
