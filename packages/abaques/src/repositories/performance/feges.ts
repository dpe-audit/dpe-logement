import data, { type Row } from '../../data/performance/feges.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FegesSchema = Row
export type FegesQuery = AbaqueQuery

export const load = () => data
export const search = (query: FegesQuery, rows: FegesSchema[]) => filter(query, rows)
