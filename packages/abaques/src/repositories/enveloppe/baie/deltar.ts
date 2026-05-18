import data from '../../../data/enveloppe/baie/deltar.js'
import { type AbaqueQuery, filter } from '../../../filter.js'

export type DeltarSchema = {
  type_fermeture: string
  deltar: number
  tv_deltar_id: number
}

export const load = (): DeltarSchema[] => data as DeltarSchema[]
export const search = (query: AbaqueQuery, rows: DeltarSchema[]) => filter(query, rows)
