import data, { type Row } from '../../../data/enveloppe/plancher-bas/ue.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UeSchema = Row
export type UeQuery = AbaqueQuery

export const load = () => data
export const search = (query: UeQuery, rows: UeSchema[]) => filter(query, rows)
