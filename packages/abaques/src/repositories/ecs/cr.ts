import data, { type Row } from '../../data/ecs/cr.js'
import { Repository } from '../../repository.js'

export type EcsCrSchema = Row

export class EcsCrRepository extends Repository<EcsCrSchema> {
  protected load(): EcsCrSchema[] {
    return data
  }
}
