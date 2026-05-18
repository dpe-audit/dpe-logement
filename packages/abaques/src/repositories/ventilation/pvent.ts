import data from '../../data/ventilation/pvent.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type PventSchema = {
  type_ventilation: string
  'annee_installation/gt': number | null
  'annee_installation/lte': number | null
  pvent: number
}

export const load = (): PventSchema[] => data as PventSchema[]
export const search = (query: AbaqueQuery, rows: PventSchema[]) => filter(query, rows)
