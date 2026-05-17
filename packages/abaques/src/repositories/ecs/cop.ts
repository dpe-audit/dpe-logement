import data, { type Row } from '../../data/ecs/cop.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type CopSchema = Row
export type CopQuery = AbaqueQuery

export const load = () => data
export const search = (query: CopQuery, rows: CopSchema[]) => filter(query, rows)
