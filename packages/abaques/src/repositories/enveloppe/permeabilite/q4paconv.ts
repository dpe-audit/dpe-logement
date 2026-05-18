import data from '../../../data/enveloppe/permeabilite/q4paconv.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type Q4paconvSchema = {
  type_batiment: string
  'annee_construction/gte': number | null
  'annee_construction/lte': number | null
  presence_joints_menuiserie: boolean | null
  isolation_murs_plafonds: boolean | null
  q4pa_conv: number
  tv_q4pa_conv_id: number
}

export const load = (): Q4paconvSchema[] => data as Q4paconvSchema[]
export const search = (query: AbaqueQuery, rows: Q4paconvSchema[]) => filter(query, rows)
