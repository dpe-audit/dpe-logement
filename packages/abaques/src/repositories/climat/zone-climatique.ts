import data, { type Row } from '../../data/climat/zone-climatique.js'
import { Repository } from '../../repository.js'

export type ClimatZoneClimatiqueSchema = Row

export class ClimatZoneClimatiqueRepository extends Repository<ClimatZoneClimatiqueSchema> {
  protected load(): ClimatZoneClimatiqueSchema[] {
    return data
  }
}
