import data, { type Row } from '../../../data/enveloppe/baie/uw.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UwSchema = Row
export type UwQuery = AbaqueQuery

export const load = () => data
export const search = (query: UwQuery, rows: UwSchema[]) => filter(query, rows)
