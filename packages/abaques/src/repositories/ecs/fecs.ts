import data, { type Row } from '../../data/ecs/fecs.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FecsSchema = Row
export type FecsQuery = AbaqueQuery

export const load = () => data
export const search = (query: FecsQuery, rows: FecsSchema[]) => filter(query, rows)
