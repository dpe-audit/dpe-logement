import data, { type Row } from '../../data/climat/zone-climatique.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type ZoneClimatiqueSchema = Row
export type ZoneClimatiqueQuery = AbaqueQuery

export const load = () => data
export const search = (query: ZoneClimatiqueQuery, rows: ZoneClimatiqueSchema[]) => filter(query, rows)
