import data, { type Row } from '../../data/performance/etiquette-climat.js'
import { Repository } from '../../repository.js'

export type PerformanceEtiquetteClimatSchema = Row

export class PerformanceEtiquetteClimatRepository extends Repository<PerformanceEtiquetteClimatSchema> {
  protected load(): PerformanceEtiquetteClimatSchema[] {
    return data
  }
}
