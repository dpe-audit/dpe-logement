import data, { type Row } from '../../../data/enveloppe/masque/omb.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type OmbSchema = Row
export type OmbQuery = AbaqueQuery

export const load = () => data
export const search = (query: OmbQuery, rows: OmbSchema[]) => filter(query, rows)
