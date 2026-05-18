import data from '../../../data/enveloppe/paroi/b.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type BSchema = {
  mitoyennete: string
  b: number
  tv_coef_reduction_deperdition_id: number
}

export const load = (): BSchema[] => data as BSchema[]
export const search = (query: AbaqueQuery, rows: BSchema[]) => filter(query, rows)
