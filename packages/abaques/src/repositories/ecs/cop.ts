import data, { type Row } from '../../data/ecs/cop.js'
import { Repository } from '../../repository.js'

export type EcsCopSchema = Row

export class EcsCopRepository extends Repository<EcsCopSchema> {
  protected load(): EcsCopSchema[] {
    return data
  }
}
