import data, { type Row } from '../../data/ventilation/pvent.js'
import { Repository } from '../../repository.js'

export type VentilationPventSchema = Row

export class VentilationPventRepository extends Repository<VentilationPventSchema> {
  protected load(): VentilationPventSchema[] {
    return data
  }
}
