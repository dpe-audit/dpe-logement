import data, { type Row } from '../../../data/enveloppe/pont-thermique/kpt.js'
import { Repository } from '../../../repository.js'

export type PontThermiqueKptSchema = Row

export class PontThermiqueKptRepository extends Repository<PontThermiqueKptSchema> {
  protected load(): PontThermiqueKptSchema[] {
    return data
  }
}
