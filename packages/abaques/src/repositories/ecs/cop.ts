import data from '../../data/ecs/cop.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type CopSchema = {
  zone_climatique: string
  type_generateur: string
  'annee_installation_generateur/gte': number | null
  'annee_installation_generateur/lte': number | null
  cop: number
  tv_scop_id: number
}

export const load = (): CopSchema[] => data as CopSchema[]
export const search = (query: AbaqueQuery, rows: CopSchema[]) => filter(query, rows)
