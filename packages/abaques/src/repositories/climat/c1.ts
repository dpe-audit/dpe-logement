import data from '../../data/climat/c1.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type C1Schema = {
  zone_climatique: string
  orientation: string
  'inclinaison/gte': number | null
  'inclinaison/lt': number | null
  'inclinaison/lte': number | null
  mois: string
  c1: number
}

export const load = (): C1Schema[] => data as C1Schema[]
export const search = (query: AbaqueQuery, rows: C1Schema[]) => filter(query, rows)
