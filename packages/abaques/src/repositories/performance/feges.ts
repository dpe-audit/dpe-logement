import data, { type Row } from '../../data/performance/feges.js'
import { Repository } from '../../repository.js'

export type PerformanceFegesSchema = Row

export class PerformanceFegesRepository extends Repository<PerformanceFegesSchema> {
  protected load(): PerformanceFegesSchema[] {
    return data
  }
}
