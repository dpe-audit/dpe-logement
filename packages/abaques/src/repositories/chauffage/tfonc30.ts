import data from '../../data/chauffage/tfonc30.js'
import { type AbaqueQuery, filter } from '../../filter.js'

export type Tfonc30Schema = {
  mode_combustion: string
  temperature_distribution: string
  'annee_installation_emetteur/lte': number | null
  'annee_installation_emetteur/gte': number | null
  'annee_installation_generateur/lte': number | null
  'annee_installation_generateur/gte': number | null
  tfonc30: number
  tv_temp_fonc_30_id: number
}

export const load = (): Tfonc30Schema[] => data as Tfonc30Schema[]
export const search = (query: AbaqueQuery, rows: Tfonc30Schema[]) => filter(query, rows)
