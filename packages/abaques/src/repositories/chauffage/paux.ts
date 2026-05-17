import data, { type Row } from '../../data/chauffage/paux.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type PauxSchema = Row
export type PauxQuery = AbaqueQuery

export const load = () => data
export const search = (query: PauxQuery, rows: PauxSchema[]) => filter(query, rows)
