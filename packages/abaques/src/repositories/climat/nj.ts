import data, { type Row } from '../../data/climat/nj.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type NjSchema = Row
export type NjQuery = AbaqueQuery

export const load = () => data
export const search = (query: NjQuery, rows: NjSchema[]) => filter(query, rows)
