import data, { type Row } from '../../../data/enveloppe/baie/deltar.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type DelatarSchema = Row
export type DelatarQuery = AbaqueQuery

export const load = () => data
export const search = (query: DelatarQuery, rows: DelatarSchema[]) => filter(query, rows)
