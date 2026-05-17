import data, { type Row } from '../../data/ecs/paux.js'
import { Repository } from '../../repository.js'

export type EcsPauxSchema = Row

export class EcsPauxRepository extends Repository<EcsPauxSchema> {
  protected load(): EcsPauxSchema[] {
    return data
  }
}
