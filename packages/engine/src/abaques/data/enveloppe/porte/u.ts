// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/enveloppe/porte/u.csv

import type { RangeBounds } from '../../../filter.js'

type Row = {
  "presence_sas": boolean
  "materiau": null | string[]
  "isolation": null | boolean
  "type_vitrage": null | string[]
  "u": number
  "tv_uporte_id": number
  "taux_vitrage": RangeBounds
}

const data: Row[] = [{"presence_sas":true,"materiau":null,"isolation":null,"type_vitrage":null,"u":1.5,"tv_uporte_id":10,"taux_vitrage":{"gt":null,"lt":null,"gte":null,"eq":null}},{"presence_sas":false,"materiau":null,"isolation":true,"type_vitrage":null,"u":1.5,"tv_uporte_id":9,"taux_vitrage":{"gt":null,"lt":null,"gte":null,"eq":0}},{"presence_sas":false,"materiau":null,"isolation":true,"type_vitrage":["double_vitrage","triple_vitrage"],"u":1.5,"tv_uporte_id":11,"taux_vitrage":{"gt":0,"lt":null,"gte":null,"eq":null}},{"presence_sas":false,"materiau":["pvc","bois"],"isolation":null,"type_vitrage":null,"u":3.5,"tv_uporte_id":1,"taux_vitrage":{"gt":null,"lt":null,"gte":null,"eq":0}},{"presence_sas":false,"materiau":["pvc","bois"],"isolation":null,"type_vitrage":["simple_vitrage"],"u":4,"tv_uporte_id":2,"taux_vitrage":{"gt":null,"lt":30,"gte":null,"eq":null}},{"presence_sas":false,"materiau":["pvc","bois"],"isolation":null,"type_vitrage":["simple_vitrage"],"u":4.5,"tv_uporte_id":3,"taux_vitrage":{"gt":null,"lt":null,"gte":30,"eq":null}},{"presence_sas":false,"materiau":["pvc","bois"],"isolation":null,"type_vitrage":["double_vitrage","triple_vitrage"],"u":3.3,"tv_uporte_id":4,"taux_vitrage":{"gt":0,"lt":null,"gte":null,"eq":null}},{"presence_sas":false,"materiau":["metal"],"isolation":null,"type_vitrage":null,"u":5.8,"tv_uporte_id":5,"taux_vitrage":{"gt":null,"lt":null,"gte":null,"eq":0}},{"presence_sas":false,"materiau":["metal"],"isolation":null,"type_vitrage":["simple_vitrage"],"u":5.8,"tv_uporte_id":6,"taux_vitrage":{"gt":0,"lt":null,"gte":null,"eq":null}},{"presence_sas":false,"materiau":["metal"],"isolation":null,"type_vitrage":["double_vitrage","triple_vitrage"],"u":5.5,"tv_uporte_id":7,"taux_vitrage":{"gt":null,"lt":30,"gte":null,"eq":null}},{"presence_sas":false,"materiau":["metal"],"isolation":null,"type_vitrage":["double_vitrage","triple_vitrage"],"u":4.8,"tv_uporte_id":8,"taux_vitrage":{"gt":null,"lt":null,"gte":30,"eq":null}}]

export type { Row }

export default data
