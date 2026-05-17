import data, { type Row } from '../../data/eclairage/nhecl.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type NheclSchema = Row
export type NheclQuery = AbaqueQuery

export const load = () => data
export const search = (query: NheclQuery, rows: NheclSchema[]) => filter(query, rows)
