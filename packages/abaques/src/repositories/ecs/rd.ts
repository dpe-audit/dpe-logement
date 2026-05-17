import data, { type Row } from '../../data/ecs/rd.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type RdSchema = Row
export type RdQuery = AbaqueQuery

export const load = () => data
export const search = (query: RdQuery, rows: RdSchema[]) => filter(query, rows)
