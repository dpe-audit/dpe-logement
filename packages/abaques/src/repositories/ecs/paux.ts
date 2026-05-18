import data from '../../data/ecs/paux.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EcsPauxSchema = {
  type_generateur: string
  energie_generateur: string | null
  presence_ventouse: boolean | null
  G: number | null
  H: number | null
  paux: string
  pn_max: number | null
}

export const load = (): EcsPauxSchema[] => data as EcsPauxSchema[]
export const search = (query: AbaqueQuery, rows: EcsPauxSchema[]) => filter(query, rows)
