import data, { type Row } from '../../data/ventilation/debits.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type DebitsSchema = Row

export type DebitsQuery = {
  type_ventilation: string
  presence_echangeur_thermique: boolean | null
  installation_collective: boolean | null
} & AbaqueQuery

export const load = () => data
export const search = (query: DebitsQuery, rows: DebitsSchema[]) => filter(query, rows)
