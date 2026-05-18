import data from '../../data/performance/feges.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FegesSchema = {
  energie: string
  usage: string | null
  feges: number
}

export const load = (): FegesSchema[] => data as FegesSchema[]
export const search = (query: AbaqueQuery, rows: FegesSchema[]) => filter(query, rows)
