import type { Category } from './types'

export const CATEGORIES: Category[] = [
  {
    id: 'konferenzen',
    label: 'Konferenzen',
    icon: '🎤',
    description: 'Bitcoin, FIRE, Freiheit',
  },
  {
    id: 'nomad',
    label: 'Nomad Events',
    icon: '🌍',
    description: 'Digital Nomad Festivals',
  },
  {
    id: 'sozialleben',
    label: 'Sozialleben',
    icon: '🤝',
    description: 'Dinner, Dating & lokale Events',
  },
  {
    id: 'tanz',
    label: 'Tanz',
    icon: '💃',
    description: 'Salsa, Forró, Swing, Tango',
  },
  {
    id: 'theater',
    label: 'Theater & Impro',
    icon: '🎭',
    description: 'Aufführungen & Workshops',
  },
  {
    id: 'retreats',
    label: 'Retreats & Festivals',
    icon: '🌿',
    description: 'Bewusstsein, Körper, Geist',
  },
  {
    id: 'wingfoil',
    label: 'Wing Foiling',
    icon: '🏄',
    description: 'Kurse, Camps & Spots',
  },
  {
    id: 'sport',
    label: 'Sport & Outdoor',
    icon: '⛰️',
    description: 'Berg, Wasser, Velo',
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}
