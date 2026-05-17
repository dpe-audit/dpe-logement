import data, { type Row } from '../../../data/enveloppe/baie/ug.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UgSchema = Row
export type UgQuery = AbaqueQuery

export const load = () => data
export const search = (query: UgQuery, rows: UgSchema[]) => filter(query, rows)
