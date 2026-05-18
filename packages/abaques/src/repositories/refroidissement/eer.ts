import data from '../../data/refroidissement/eer.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EerSchema = {
  zone_climatique: string
  'annee_installation/gte': number | null
  'annee_installation/lte': number | null
  seer: number
  eer: number
  tv_seer_id: number
}

export const load = (): EerSchema[] => data as EerSchema[]
export const search = (query: AbaqueQuery, rows: EerSchema[]) => filter(query, rows)
