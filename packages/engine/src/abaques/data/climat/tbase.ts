// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/climat/tbase.csv

import type { RangeBounds } from '../../filter.js'

type Row = {
  "zone_climatique": string[]
  "tbase": number
  "altitude": RangeBounds
}

const data: Row[] = [{"zone_climatique":["H1a","H1b","H1c"],"tbase":-9.5,"altitude":{"gt":null,"gte":null,"lt":400,"lte":null}},{"zone_climatique":["H1a","H1b","H1c"],"tbase":-11.5,"altitude":{"gt":null,"gte":400,"lt":null,"lte":800}},{"zone_climatique":["H1a","H1b","H1c"],"tbase":-13.5,"altitude":{"gt":800,"gte":null,"lt":null,"lte":null}},{"zone_climatique":["H2a","H2b","H2c","H2d"],"tbase":-6.5,"altitude":{"gt":null,"gte":null,"lt":400,"lte":null}},{"zone_climatique":["H2a","H2b","H2c","H2d"],"tbase":-8.5,"altitude":{"gt":null,"gte":400,"lt":null,"lte":800}},{"zone_climatique":["H2a","H2b","H2c","H2d"],"tbase":-10.5,"altitude":{"gt":800,"gte":null,"lt":null,"lte":null}},{"zone_climatique":["H3"],"tbase":-3.5,"altitude":{"gt":null,"gte":null,"lt":400,"lte":null}},{"zone_climatique":["H3"],"tbase":-5.5,"altitude":{"gt":null,"gte":400,"lt":null,"lte":800}},{"zone_climatique":["H3"],"tbase":-7.5,"altitude":{"gt":800,"gte":null,"lt":null,"lte":null}}]

export type { Row }

export default data
