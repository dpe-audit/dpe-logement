import data, { type Row } from '../../data/ecs/rd.js'
import { Repository } from '../../repository.js'

export type EcsRdSchema = Row

export class EcsRdRepository extends Repository<EcsRdSchema> {
  protected load(): EcsRdSchema[] {
    return data
  }
}
