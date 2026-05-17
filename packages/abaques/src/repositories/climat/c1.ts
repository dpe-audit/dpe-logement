import data, { type Row } from '../../data/climat/c1.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type C1Schema = Row
export type C1Query = AbaqueQuery

export const load = () => data
export const search = (query: C1Query, rows: C1Schema[]) => filter(query, rows)
