import data, { type Row } from '../../data/chauffage/scop.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type ScopSchema = Row
export type ScopQuery = AbaqueQuery

export const load = () => data
export const search = (query: ScopQuery, rows: ScopSchema[]) => filter(query, rows)
