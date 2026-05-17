import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/uvue.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UvueSchema = Row
export type UvueQuery = AbaqueQuery

export const load = () => data
export const search = (query: UvueQuery, rows: UvueSchema[]) => filter(query, rows)
