import data, { type Row } from '../../data/chauffage/tfonc30.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type Tfonc30Schema = Row
export type Tfonc30Query = AbaqueQuery

export const load = () => data
export const search = (query: Tfonc30Query, rows: Tfonc30Schema[]) => filter(query, rows)
