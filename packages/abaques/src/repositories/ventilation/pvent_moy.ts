import data, { type Row } from '../../data/ventilation/pvent_moy.js'
import { Repository } from '../../repository.js'

export type VentilationPventMoySchema = Row

export class VentilationPventMoyRepository extends Repository<VentilationPventMoySchema> {
  protected load(): VentilationPventMoySchema[] {
    return data
  }
}
