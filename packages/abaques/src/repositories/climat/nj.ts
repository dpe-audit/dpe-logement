import data, { type Row } from '../../data/climat/nj.js'
import { Repository } from '../../repository.js'

export type ClimatNjSchema = Row

export class ClimatNjRepository extends Repository<ClimatNjSchema> {
  protected load(): ClimatNjSchema[] {
    return data
  }
}
