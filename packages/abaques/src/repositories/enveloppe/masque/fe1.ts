import data, { type Row } from '../../../data/enveloppe/masque/fe1.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type Fe1Schema = Row
export type Fe1Query = AbaqueQuery

export const load = () => data
export const search = (query: Fe1Query, rows: Fe1Schema[]) => filter(query, rows)
