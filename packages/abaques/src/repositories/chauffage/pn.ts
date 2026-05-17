import data, { type Row } from '../../data/chauffage/pn.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type PnSchema = Row
export type PnQuery = AbaqueQuery

export const load = () => data
export const search = (query: PnQuery, rows: PnSchema[]) => filter(query, rows)
