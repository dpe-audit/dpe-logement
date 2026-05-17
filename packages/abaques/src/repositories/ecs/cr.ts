import data, { type Row } from '../../data/ecs/cr.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type CrSchema = Row
export type CrQuery = AbaqueQuery

export const load = () => data
export const search = (query: CrQuery, rows: CrSchema[]) => filter(query, rows)
