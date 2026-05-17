import data, { type Row } from '../../data/ventilation/debits.js'
import { Repository } from '../../repository.js'

export type VentilationDebitsSchema = Row

export class VentilationDebitsRepository extends Repository<VentilationDebitsSchema> {
  protected load(): VentilationDebitsSchema[] {
    return data
  }
}
