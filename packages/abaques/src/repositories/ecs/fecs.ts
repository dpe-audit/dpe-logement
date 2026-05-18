import data from '../../data/ecs/fecs.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type FecsSchema = {
  type_batiment: string
  zone_climatique: string
  usage_solaire: string
  'anciennete_installation/gt': number | null
  'anciennete_installation/lte': number | null
  fecs: number
  tv_facteur_couverture_solaire_id: number
}

export const load = (): FecsSchema[] => data as FecsSchema[]
export const search = (query: AbaqueQuery, rows: FecsSchema[]) => filter(query, rows)
