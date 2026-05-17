import data, { type Row } from '../../../data/enveloppe/masque/fe2.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type Fe2Schema = Row
export type Fe2Query = AbaqueQuery

export const load = () => data
export const search = (query: Fe2Query, rows: Fe2Schema[]) => filter(query, rows)
