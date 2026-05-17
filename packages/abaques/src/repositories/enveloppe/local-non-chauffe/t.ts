import data, { type Row } from '../../../data/enveloppe/local-non-chauffe/t.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type TSchema = Row
export type TQuery = AbaqueQuery

export const load = () => data
export const search = (query: TQuery, rows: TSchema[]) => filter(query, rows)
