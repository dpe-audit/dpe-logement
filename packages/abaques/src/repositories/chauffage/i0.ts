import data, { type Row } from '../../data/chauffage/i0.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type I0Schema = Row
export type I0Query = AbaqueQuery

export const load = () => data
export const search = (query: I0Query, rows: I0Schema[]) => filter(query, rows)
