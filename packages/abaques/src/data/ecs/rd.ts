// GÉNÉRÉ AUTOMATIQUEMENT — ne pas modifier manuellement
// Source : doctrine/abaques/ecs/rd.csv

type Row = {
  "reseau_collectif": boolean
  "bouclage_reseau": null | string[]
  "alimentation_contigue": boolean | null
  "production_volume_habitable": boolean | null
  "rd": number
  "tv_rendement_distribution_ecs_id": number
}

const data: Row[] = [{"reseau_collectif":false,"bouclage_reseau":null,"alimentation_contigue":true,"production_volume_habitable":true,"rd":0.93,"tv_rendement_distribution_ecs_id":1},{"reseau_collectif":false,"bouclage_reseau":null,"alimentation_contigue":false,"production_volume_habitable":true,"rd":0.87,"tv_rendement_distribution_ecs_id":2},{"reseau_collectif":false,"bouclage_reseau":null,"alimentation_contigue":null,"production_volume_habitable":false,"rd":0.83,"tv_rendement_distribution_ecs_id":3},{"reseau_collectif":true,"bouclage_reseau":null,"alimentation_contigue":true,"production_volume_habitable":null,"rd":0.28,"tv_rendement_distribution_ecs_id":4},{"reseau_collectif":true,"bouclage_reseau":null,"alimentation_contigue":false,"production_volume_habitable":null,"rd":0.26,"tv_rendement_distribution_ecs_id":5},{"reseau_collectif":true,"bouclage_reseau":["non_boucle"],"alimentation_contigue":true,"production_volume_habitable":null,"rd":0.28,"tv_rendement_distribution_ecs_id":4},{"reseau_collectif":true,"bouclage_reseau":["non_boucle"],"alimentation_contigue":false,"production_volume_habitable":null,"rd":0.26,"tv_rendement_distribution_ecs_id":5},{"reseau_collectif":true,"bouclage_reseau":["boucle"],"alimentation_contigue":true,"production_volume_habitable":null,"rd":0.55,"tv_rendement_distribution_ecs_id":6},{"reseau_collectif":true,"bouclage_reseau":["boucle"],"alimentation_contigue":false,"production_volume_habitable":null,"rd":0.52,"tv_rendement_distribution_ecs_id":7},{"reseau_collectif":true,"bouclage_reseau":["trace"],"alimentation_contigue":null,"production_volume_habitable":null,"rd":0.83,"tv_rendement_distribution_ecs_id":8}]

export type { Row }

export default data
