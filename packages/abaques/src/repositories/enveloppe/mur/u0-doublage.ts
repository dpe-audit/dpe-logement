import data, { type Row } from '../../../data/enveloppe/mur/u0-doublage.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type U0DoublageSchema = Row
export type U0DoublageQuery = AbaqueQuery

export const load = () => data
export const search = (query: U0DoublageQuery, rows: U0DoublageSchema[]) => filter(query, rows)
