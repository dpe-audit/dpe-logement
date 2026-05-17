import data, { type Row } from '../../data/climat/c1.js'
import { Repository } from '../../repository.js'

export type ClimatC1Schema = Row

export class ClimatC1Repository extends Repository<ClimatC1Schema> {
  protected load(): ClimatC1Schema[] {
    return data
  }
}
