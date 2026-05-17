import data, { type Row } from '../../../data/enveloppe/baie/sw.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type SwSchema = Row
export type SwQuery = AbaqueQuery

export const load = () => data
export const search = (query: SwQuery, rows: SwSchema[]) => filter(query, rows)
