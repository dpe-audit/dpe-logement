import data from '../../data/chauffage/i0.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type I0Schema = {
  type_batiment: string
  type_emission: string
  type_intermittence: string
  chauffage_central: boolean | null
  regulation_terminale: boolean | null
  chauffage_collectif: boolean | null
  inertie_lourde: boolean | null
  comptage_individuel: boolean | null
  i0: number
  tv_intermittence_id: number
}

export const load = (): I0Schema[] => data as I0Schema[]
export const search = (query: AbaqueQuery, rows: I0Schema[]) => filter(query, rows)
