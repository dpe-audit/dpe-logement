import data, { type Row } from '../../../data/enveloppe/pont-thermique/kpt.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type KptSchema = Row
export type KptQuery = AbaqueQuery

export const load = () => data
export const search = (query: KptQuery, rows: KptSchema[]) => filter(query, rows)
