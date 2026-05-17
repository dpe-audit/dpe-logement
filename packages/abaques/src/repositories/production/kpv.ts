import data, { type Row } from '../../data/production/kpv.js'
import { Repository } from '../../repository.js'

export type ProductionKpvSchema = Row

export class ProductionKpvRepository extends Repository<ProductionKpvSchema> {
  protected load(): ProductionKpvSchema[] {
    return data
  }
}
