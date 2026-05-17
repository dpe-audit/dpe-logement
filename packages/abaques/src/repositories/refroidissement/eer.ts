import data, { type Row } from '../../data/refroidissement/eer.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EerSchema = Row
export type EerQuery = AbaqueQuery

export const load = () => data
export const search = (query: EerQuery, rows: EerSchema[]) => filter(query, rows)
