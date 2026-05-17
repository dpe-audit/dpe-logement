import data, { type Row } from '../../data/chauffage/combustion.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type CombustionSchema = Row
export type CombustionQuery = AbaqueQuery

export const load = () => data
export const search = (query: CombustionQuery, rows: CombustionSchema[]) => filter(query, rows)
