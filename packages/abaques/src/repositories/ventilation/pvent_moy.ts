import data, { type Row } from '../../data/ventilation/pvent_moy.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type PventMoySchema = Row
export type PventMoyQuery = AbaqueQuery

export const load = () => data
export const search = (query: PventMoyQuery, rows: PventMoySchema[]) => filter(query, rows)
