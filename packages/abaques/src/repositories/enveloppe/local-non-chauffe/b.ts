import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/b.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type BSchema = Row
export type BQuery = AbaqueQuery

export const load = () => data
export const search = (query: BQuery, rows: BSchema[]) => filter(query, rows)
