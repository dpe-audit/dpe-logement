import data from '../../../data/enveloppe/mur/umur0.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type Umur0Schema = {
  type_mur: string
  epaisseur_mur: number | null
  'annee_construction/lte': number | null
  'annee_construction/gte': number | null
  u0: number
  tv_umur0_id: number
}

export const load = (): Umur0Schema[] => data as Umur0Schema[]
export const search = (query: AbaqueQuery, rows: Umur0Schema[]) => filter(query, rows)
