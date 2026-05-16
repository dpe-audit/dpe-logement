// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/chauffage/tfonc100.csv

import type { RangeBounds } from '../../filter.js'

type Row = {
  "temperature_distribution": string[]
  "tfonc100": number
  "tv_temp_fonc_100_id": number
  "annee_installation_emetteur": RangeBounds
}

const data: Row[] = [{"temperature_distribution":["basse"],"tfonc100":60,"tv_temp_fonc_100_id":1,"annee_installation_emetteur":{"gte":null,"lte":1980}},{"temperature_distribution":["moyenne"],"tfonc100":80,"tv_temp_fonc_100_id":2,"annee_installation_emetteur":{"gte":null,"lte":1980}},{"temperature_distribution":["haute"],"tfonc100":80,"tv_temp_fonc_100_id":3,"annee_installation_emetteur":{"gte":null,"lte":1980}},{"temperature_distribution":["basse"],"tfonc100":35,"tv_temp_fonc_100_id":4,"annee_installation_emetteur":{"gte":1981,"lte":2000}},{"temperature_distribution":["moyenne"],"tfonc100":70,"tv_temp_fonc_100_id":5,"annee_installation_emetteur":{"gte":1981,"lte":2000}},{"temperature_distribution":["haute"],"tfonc100":70,"tv_temp_fonc_100_id":6,"annee_installation_emetteur":{"gte":1981,"lte":2000}},{"temperature_distribution":["basse"],"tfonc100":35,"tv_temp_fonc_100_id":7,"annee_installation_emetteur":{"gte":2001,"lte":null}},{"temperature_distribution":["moyenne"],"tfonc100":60,"tv_temp_fonc_100_id":8,"annee_installation_emetteur":{"gte":2001,"lte":null}},{"temperature_distribution":["haute"],"tfonc100":70,"tv_temp_fonc_100_id":9,"annee_installation_emetteur":{"gte":2001,"lte":null}}]

export type { Row }

export default data
