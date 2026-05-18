import data from '../../data/performance/reseau.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type ReseauSchema = {
  id: string
  contenu_co2: number
  contenu_co2_acv: number
  taux_enr: number
  feges: number
}

export const load = (): ReseauSchema[] => data as ReseauSchema[]
export const search = (query: AbaqueQuery, rows: ReseauSchema[]) => filter(query, rows)
