import data from '../../../data/enveloppe/pont-thermique/kpt.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type KptSchema = {
  type_liaison: string
  isolation_mur: boolean
  type_isolation_mur: string | null
  isolation_plancher: boolean | null
  type_isolation_plancher: string | null
  type_pose_menuiserie: string | null
  presence_retour_isolation: boolean | null
  'largeur_dormant/lte': number | null
  'largeur_dormant/gt': number | null
  kpt: number
  tv_pont_thermique_id: number
}

export const load = (): KptSchema[] => data as KptSchema[]
export const search = (query: AbaqueQuery, rows: KptSchema[]) => filter(query, rows)
