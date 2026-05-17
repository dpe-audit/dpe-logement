import data, { type Row } from '../../../data/enveloppe/plancher-haut/u0.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type U0Schema = Row
export type U0Query = AbaqueQuery

export const load = () => data
export const search = (query: U0Query, rows: U0Schema[]) => filter(query, rows)
