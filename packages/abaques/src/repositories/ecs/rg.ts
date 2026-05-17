import data, { type Row } from '../../data/ecs/rg.js'
import { Repository } from '../../repository.js'

export type EcsRgSchema = Row

export class EcsRgRepository extends Repository<EcsRgSchema> {
  protected load(): EcsRgSchema[] {
    return data
  }
}
