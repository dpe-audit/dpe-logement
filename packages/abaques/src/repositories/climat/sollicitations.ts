import data, { type Row } from '../../data/climat/sollicitations.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type SollicitationsSchema = Row
export type SollicitationsQuery = AbaqueQuery

export const load = () => data
export const search = (query: SollicitationsQuery, rows: SollicitationsSchema[]) => filter(query, rows)
