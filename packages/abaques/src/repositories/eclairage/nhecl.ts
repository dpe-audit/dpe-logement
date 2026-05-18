import data from '../../data/eclairage/nhecl.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type NheclSchema = {
  zone_climatique: string
  nhecl: number
}

export const load = (): NheclSchema[] => data as NheclSchema[]
export const search = (query: AbaqueQuery, rows: NheclSchema[]) => filter(query, rows)
