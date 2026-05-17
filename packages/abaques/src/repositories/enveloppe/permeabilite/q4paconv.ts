import data, { type Row } from '../../../data/enveloppe/permeabilite/q4paconv.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type Q4paconvSchema = Row
export type Q4paconvQuery = AbaqueQuery

export const load = () => data
export const search = (query: Q4paconvQuery, rows: Q4paconvSchema[]) => filter(query, rows)
