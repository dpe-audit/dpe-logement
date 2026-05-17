import data, { type Row } from '../../data/chauffage/fch.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FchSchema = Row
export type FchQuery = AbaqueQuery

export const load = () => data
export const search = (query: FchQuery, rows: FchSchema[]) => filter(query, rows)
