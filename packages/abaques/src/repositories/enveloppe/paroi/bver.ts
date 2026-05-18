import data from '../../../data/enveloppe/paroi/bver.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type BverSchema = {
  zone_climatique: string
  orientation_ets: string
  isolation_paroi: boolean
  bver: number
  tv_coef_reduction_deperdition_id: number
}

export const load = (): BverSchema[] => data as BverSchema[]
export const search = (query: AbaqueQuery, rows: BverSchema[]) => filter(query, rows)
