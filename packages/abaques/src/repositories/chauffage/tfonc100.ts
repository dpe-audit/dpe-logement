import data, { type Row } from '../../data/chauffage/tfonc100.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type Tfonc100Schema = Row
export type Tfonc100Query = AbaqueQuery

export const load = () => data
export const search = (query: Tfonc100Query, rows: Tfonc100Schema[]) => filter(query, rows)
