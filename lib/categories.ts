import type { Category } from './types'

export const CATEGORIES: Category[] = [
  {
    id: 'ausgehen',
    label: 'Ausgehen',
    icon: '🍻',
    description: 'Venues, Konzerte & Abendprogramm',
  },
  {
    id: 'sozialleben',
    label: 'Sozialleben',
    icon: '🤝',
    description: 'Dinner, Dating & lokale Begegnungen',
  },
  {
    id: 'tanz-buehne',
    label: 'Tanz & Bühne',
    icon: '💃',
    description: 'Salsa, Forró, Theater, Chor & Impro',
  },
  {
    id: 'festivals-konferenzen',
    label: 'Festivals & Konferenzen',
    icon: '🎤',
    description: 'Bitcoin, FIRE, Nomad & Libertäres',
  },
  {
    id: 'retreats',
    label: 'Retreats',
    icon: '🌿',
    description: 'Bewusstsein, Körper & Geist',
  },
  {
    id: 'austausch',
    label: 'Austausch & Volunteering',
    icon: '🌱',
    description: 'Freiwilligenarbeit, Workcamps & Austausch',
  },
  {
    id: 'wassersport',
    label: 'Wassersport',
    icon: '🏄',
    description: 'Wing Foil, Kite, Surfen & mehr',
  },
  {
    id: 'sport',
    label: 'Sport & Outdoor',
    icon: '⛰️',
    description: 'Berg, Velo, Reiten & Triathlon',
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
