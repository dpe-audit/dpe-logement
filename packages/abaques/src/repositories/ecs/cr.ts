import data from '../../data/ecs/cr.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type CrSchema = {
  position_chauffe_eau: string
  label_generateur: string | null
  'volume_stockage/lte': number | null
  'volume_stockage/gt': number | null
  cr: number
  tv_pertes_stockage_id: number
}

export const load = (): CrSchema[] => data as CrSchema[]
export const search = (query: AbaqueQuery, rows: CrSchema[]) => filter(query, rows)
