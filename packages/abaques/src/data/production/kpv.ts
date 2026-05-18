// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/production/kpv.csv

import type { RangeBounds } from '../../filter.js'

type Row = {
  "orientation_pv": string[]
  "kpv": number
  "inclinaison_pv": RangeBounds
}

const data: Row[] = [{"orientation_pv":["nord|nord_est|nord_ouest"],"kpv":0,"inclinaison_pv":{"gt":null,"lte":null}},{"orientation_pv":["est|sud_est|sud|sur_ouest|ouest"],"kpv":1,"inclinaison_pv":{"gt":null,"lte":15}},{"orientation_pv":["est"],"kpv":0.96,"inclinaison_pv":{"gt":15,"lte":45}},{"orientation_pv":["est"],"kpv":0.83,"inclinaison_pv":{"gt":45,"lte":75}},{"orientation_pv":["est"],"kpv":0.59,"inclinaison_pv":{"gt":75,"lte":null}},{"orientation_pv":["sud_est"],"kpv":1.03,"inclinaison_pv":{"gt":15,"lte":45}},{"orientation_pv":["sud_est"],"kpv":0.94,"inclinaison_pv":{"gt":45,"lte":75}},{"orientation_pv":["sud_est"],"kpv":0.71,"inclinaison_pv":{"gt":75,"lte":null}},{"orientation_pv":["sud"],"kpv":1.07,"inclinaison_pv":{"gt":15,"lte":45}},{"orientation_pv":["sud"],"kpv":0.97,"inclinaison_pv":{"gt":45,"lte":75}},{"orientation_pv":["sud"],"kpv":0.73,"inclinaison_pv":{"gt":75,"lte":null}},{"orientation_pv":["sud_ouest"],"kpv":1.03,"inclinaison_pv":{"gt":15,"lte":45}},{"orientation_pv":["sud_ouest"],"kpv":0.94,"inclinaison_pv":{"gt":45,"lte":75}},{"orientation_pv":["sud_ouest"],"kpv":0.71,"inclinaison_pv":{"gt":75,"lte":null}},{"orientation_pv":["ouest"],"kpv":0.96,"inclinaison_pv":{"gt":15,"lte":45}},{"orientation_pv":["ouest"],"kpv":0.83,"inclinaison_pv":{"gt":45,"lte":75}},{"orientation_pv":["ouest"],"kpv":0.59,"inclinaison_pv":{"gt":75,"lte":null}}]

export type { Row }

export default data
