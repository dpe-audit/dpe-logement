import data, { type Row } from '../../data/ecs/combustion.js'
import { Repository } from '../../repository.js'

export type EcsCombustionSchema = Row

export class EcsCombustionRepository extends Repository<EcsCombustionSchema> {
  protected load(): EcsCombustionSchema[] {
    return data
  }
}
