import data, { type Row } from '../../data/ecs/rg.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type RgSchema = Row
export type RgQuery = AbaqueQuery

export const load = () => data
export const search = (query: RgQuery, rows: RgSchema[]) => filter(query, rows)
