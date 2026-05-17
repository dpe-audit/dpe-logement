import data, { type Row } from '../../data/performance/reseau.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type ReseauSchema = Row
export type ReseauQuery = AbaqueQuery

export const load = () => data
export const search = (query: ReseauQuery, rows: ReseauSchema[]) => filter(query, rows)
