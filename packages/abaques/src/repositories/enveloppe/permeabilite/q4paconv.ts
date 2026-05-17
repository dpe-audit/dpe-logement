import data, { type Row } from '../../../data/enveloppe/permeabilite/q4paconv.js'
import { Repository } from '../../../repository.js'

export type PermeabiliteQ4paconvSchema = Row

export class PermeabiliteQ4paconvRepository extends Repository<PermeabiliteQ4paconvSchema> {
  protected load(): PermeabiliteQ4paconvSchema[] {
    return data
  }
}
