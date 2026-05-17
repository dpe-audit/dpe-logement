import data, { type Row } from '../../../data/enveloppe/baie/ujn.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type UjnSchema = Row
export type UjnQuery = AbaqueQuery

export const load = () => data
export const search = (query: UjnQuery, rows: UjnSchema[]) => filter(query, rows)
