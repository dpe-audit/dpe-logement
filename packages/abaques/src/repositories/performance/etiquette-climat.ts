import data, { type Row } from '../../data/performance/etiquette-climat.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EtiquetteClimatSchema = Row
export type EtiquetteClimatQuery = AbaqueQuery

export const load = () => data
export const search = (query: EtiquetteClimatQuery, rows: EtiquetteClimatSchema[]) => filter(query, rows)
