import data, { type Row } from '../../data/performance/etiquette-energie.js'
import { Repository } from '../../repository.js'

export type PerformanceEtiquetteEnergieSchema = Row

export class PerformanceEtiquetteEnergieRepository extends Repository<PerformanceEtiquetteEnergieSchema> {
  protected load(): PerformanceEtiquetteEnergieSchema[] {
    return data
  }
}
