import data, { type Row } from '../../data/ventilation/pvent.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type PventSchema = Row
export type PventQuery = AbaqueQuery

export const load = () => data
export const search = (query: PventQuery, rows: PventSchema[]) => filter(query, rows)
