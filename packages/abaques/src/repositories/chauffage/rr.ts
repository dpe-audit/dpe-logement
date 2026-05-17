import data, { type Row } from '../../data/chauffage/rr.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type RrSchema = Row
export type RrQuery = AbaqueQuery

export const load = () => data
export const search = (query: RrQuery, rows: RrSchema[]) => filter(query, rows)
