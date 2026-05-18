import data from '../../../data/enveloppe/mur/umur.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UmurSchema = {
  zone_climatique: string
  'annee_construction_isolation/gte': number | null
  'annee_construction_isolation/lte': number | null
  effet_joule: boolean
  u: number
  tv_umur_id: number
}

export const load = (): UmurSchema[] => data as UmurSchema[]
export const search = (query: AbaqueQuery, rows: UmurSchema[]) => filter(query, rows)
