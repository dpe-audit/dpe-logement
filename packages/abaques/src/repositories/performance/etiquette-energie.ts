import data, { type Row } from '../../data/performance/etiquette-energie.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EtiquetteEnergieSchema = Row
export type EtiquetteEnergieQuery = AbaqueQuery

export const load = () => data
export const search = (query: EtiquetteEnergieQuery, rows: EtiquetteEnergieSchema[]) => filter(query, rows)
