// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/chauffage/rd.csv

type Row = {
  "type_distribution": string[]
  "temperature_distribution": null | string[]
  "presence_fluide_frigorigene": boolean | null
  "reseau_collectif": null | boolean
  "isolation_reseau": null | boolean
  "rd": number
}

const data: Row[] = [{"type_distribution":["hydraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":true,"reseau_collectif":null,"isolation_reseau":null,"rd":1},{"type_distribution":["aeraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":true,"reseau_collectif":null,"isolation_reseau":null,"rd":1},{"type_distribution":["hydraulique"],"temperature_distribution":["basse"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":true,"rd":0.95},{"type_distribution":["hydraulique"],"temperature_distribution":["moyenne"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":true,"rd":0.95},{"type_distribution":["hydraulique"],"temperature_distribution":["haute"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":true,"rd":0.92},{"type_distribution":["hydraulique"],"temperature_distribution":["basse"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":true,"rd":0.9},{"type_distribution":["hydraulique"],"temperature_distribution":["moyenne"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":true,"rd":0.9},{"type_distribution":["hydraulique"],"temperature_distribution":["haute"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":true,"rd":0.87},{"type_distribution":["hydraulique"],"temperature_distribution":["basse"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":false,"rd":0.91},{"type_distribution":["hydraulique"],"temperature_distribution":["moyenne"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":false,"rd":0.91},{"type_distribution":["hydraulique"],"temperature_distribution":["haute"],"presence_fluide_frigorigene":null,"reseau_collectif":false,"isolation_reseau":false,"rd":0.88},{"type_distribution":["hydraulique"],"temperature_distribution":["basse"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":false,"rd":0.87},{"type_distribution":["hydraulique"],"temperature_distribution":["moyenne"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":false,"rd":0.87},{"type_distribution":["hydraulique"],"temperature_distribution":["haute"],"presence_fluide_frigorigene":null,"reseau_collectif":true,"isolation_reseau":false,"rd":0.85},{"type_distribution":["hydraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":null,"reseau_collectif":null,"isolation_reseau":null,"rd":0.8},{"type_distribution":["aeraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":null,"reseau_collectif":null,"isolation_reseau":true,"rd":0.85},{"type_distribution":["aeraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":null,"reseau_collectif":null,"isolation_reseau":false,"rd":0.8},{"type_distribution":["aeraulique"],"temperature_distribution":null,"presence_fluide_frigorigene":null,"reseau_collectif":null,"isolation_reseau":null,"rd":0.8}]

export type { Row }

export default data
