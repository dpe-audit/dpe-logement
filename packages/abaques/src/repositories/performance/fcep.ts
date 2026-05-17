import data, { type Row } from '../../data/performance/fcep.js'
import { Repository } from '../../repository.js'

export type PerformanceFcepSchema = Row

export class PerformanceFcepRepository extends Repository<PerformanceFcepSchema> {
  protected load(): PerformanceFcepSchema[] {
    return data
  }
}
