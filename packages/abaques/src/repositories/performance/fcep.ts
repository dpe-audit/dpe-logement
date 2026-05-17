import data, { type Row } from '../../data/performance/fcep.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FcepSchema = Row
export type FcepQuery = AbaqueQuery

export const load = () => data
export const search = (query: FcepQuery, rows: FcepSchema[]) => filter(query, rows)
