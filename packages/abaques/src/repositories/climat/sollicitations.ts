import data, { type Row } from '../../data/climat/sollicitations.js'
import { Repository } from '../../repository.js'

export type ClimatSollicitationsSchema = Row

export class ClimatSollicitationsRepository extends Repository<ClimatSollicitationsSchema> {
  protected load(): ClimatSollicitationsSchema[] {
    return data
  }
}
