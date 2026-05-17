import data, { type Row } from '../../data/ecs/fecs.js'
import { Repository } from '../../repository.js'

export type EcsFecsSchema = Row

export class EcsFecsRepository extends Repository<EcsFecsSchema> {
  protected load(): EcsFecsSchema[] {
    return data
  }
}
