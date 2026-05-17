import data, { type Row } from '../../data/chauffage/re.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type ReSchema = Row
export type ReQuery = AbaqueQuery

export const load = () => data
export const search = (query: ReQuery, rows: ReSchema[]) => filter(query, rows)
