import data from '../../../data/enveloppe/mur/u0-doublage.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type U0DoublageSchema = {
  type_doublage: string
  u0_doublage: number
}

export const load = (): U0DoublageSchema[] => data as U0DoublageSchema[]
export const search = (query: AbaqueQuery, rows: U0DoublageSchema[]) => filter(query, rows)
