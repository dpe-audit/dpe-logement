import data, { type Row } from '../../data/chauffage/combustion.js'
import { Repository } from '../../repository.js'

export type ChauffageCombustionSchema = Row

export class ChauffageCombustionRepository extends Repository<ChauffageCombustionSchema> {
  protected load(): ChauffageCombustionSchema[] {
    return data
  }
}
