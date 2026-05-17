import data, { type Row } from '../../data/climat/tbase.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type TbaseSchema = Row
export type TbaseQuery = AbaqueQuery

export const load = () => data
export const search = (query: TbaseQuery, rows: TbaseSchema[]) => filter(query, rows)
