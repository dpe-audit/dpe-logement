import data, { type Row } from '../../../data/enveloppe/paroi/bver.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type BverSchema = Row
export type BverQuery = AbaqueQuery

export const load = () => data
export const search = (query: BverQuery, rows: BverSchema[]) => filter(query, rows)
