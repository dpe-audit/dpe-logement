import data, { type Row } from '../../data/performance/reseau.js'
import { Repository } from '../../repository.js'

export type PerformanceReseauSchema = Row

export class PerformanceReseauRepository extends Repository<PerformanceReseauSchema> {
  protected load(): PerformanceReseauSchema[] {
    return data
  }
}
