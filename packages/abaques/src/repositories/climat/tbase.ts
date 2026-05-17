import data, { type Row } from '../../data/climat/tbase.js'
import { Repository } from '../../repository.js'

export type ClimatTbaseSchema = Row

export class ClimatTbaseRepository extends Repository<ClimatTbaseSchema> {
  protected load(): ClimatTbaseSchema[] {
    return data
  }
}
