import data from '../../data/ecs/rd.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type EcsRdSchema = {
  reseau_collectif: boolean
  bouclage_reseau: string | null
  alimentation_contigue: boolean | null
  production_volume_habitable: boolean | null
  rd: number
  tv_rendement_distribution_ecs_id: number
}

export const load = (): EcsRdSchema[] => data as EcsRdSchema[]
export const search = (query: AbaqueQuery, rows: EcsRdSchema[]) => filter(query, rows)
