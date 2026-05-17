import data, { type Row } from '../../../data/enveloppe/plancher-bas/u.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type USchema = Row
export type UQuery = AbaqueQuery

export const load = () => data
export const search = (query: UQuery, rows: USchema[]) => filter(query, rows)
