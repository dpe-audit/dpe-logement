import data, { type Row } from '../../data/production/kpv.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type KpvSchema = Row
export type KpvQuery = AbaqueQuery

export const load = () => data
export const search = (query: KpvQuery, rows: KpvSchema[]) => filter(query, rows)
