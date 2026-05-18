import data from '../../data/chauffage/fch.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FchSchema = {
  zone_climatique: string
  type_batiment: string
  fch: number
  tv_facteur_couverture_solaire_id: number
}

export const load = (): FchSchema[] => data as FchSchema[]
export const search = (query: AbaqueQuery, rows: FchSchema[]) => filter(query, rows)
