import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment, Ecs } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { reduceParMois } from "#utils/helpers.js";

/**
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @returns Besoins d'eau chaude sanitaire proratisés à l'installation en kWh/mois
 */
export function calcule_becs(props: {
	becs: Common.ParMois<number>;
	rdim: number;
}): number {
	const { rdim } = props;
	const becs = reduceParMois(props.becs);
	return becs * rdim;
}

/**
 * @param props.surface_installation - Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.surface_installations - Surface totale des installations d'eau chaude sanitaire en m²
 * @returns Ratio de dimensionnement de l'installation d'eau chaude sanitaire
 */
export function calcule_rdim(props: {
	surface_installation: number;
	surface_installations: number;
}): number {
	const { surface_installation, surface_installations } = props;
	return surface_installation / surface_installations;
}

/**
 * @param props.fch_saisi - Facteur de couverture solaire saisi
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.type_batiment - Type de bâtiment
 * @param props.usage_solaire - Usage du solaire thermique
 * @param props.anciennete_installation - Ancienneté de l'installation solaire en année
 * @returns Facteur de couverture solaire de l'installation d'eau chaude sanitaire
 */
export function calcule_fecs(props: {
	fecs_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	type_batiment: Batiment.TypeBatiment;
	usage_solaire: Ecs.Installation.UsageSolaire;
	anciennete_installation: number;
}): number {
	const { fecs_saisi, ...query } = props;
	if (fecs_saisi) return fecs_saisi;
	const abaque = abaques.ecs.fecs;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.fecs;
}

/**
 * @param props.qdw_ind_vc : {@linkcode calcule_qdw_ind_vc}
 * @param props.qdw_col_vc : {@linkcode calcule_qdw_col_vc}
 * @param props.qdw_col_hvc : {@linkcode calcule_qdw_col_hvc}
 * @return Pertes de distribution d'eau chaude sanitaire en volume chauffé en Wh/mois
 */
export function calcule_qdw(props: {
	qdw_ind_vc: number;
	qdw_col_vc: number;
	qdw_col_hvc: number;
}): number {
	const { qdw_ind_vc, qdw_col_vc, qdw_col_hvc } = props;
	return qdw_ind_vc + qdw_col_vc + qdw_col_hvc;
}

/**
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.sh : Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.ns : Nombre de systèmes d'eau chaude sanitaire associés à l'installation
 * @return Pertes de distribution individuelle en volume chauffé de l'installation d'eau chaude sanitaire en Wh/an
 */
export function calcule_qdw_ind_vc(props: {
	becs: Common.ParMois<number>;
	sh: number;
	ns: number;
}): number {
	const { sh, ns } = props;
	const becs = reduceParMois(props.becs) * 1000;
	const rat = 1 / ns;
	const lvc = 0.2 * sh * rat;
	return ((0.5 * lvc) / sh) * becs;
}

/**
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.reseau_collectif : Indique si le réseau est collectif
 * @return Pertes de distribution collective en volume chauffé en Wh/an
 */
export function calcule_qdw_col_vc(props: {
	becs: Common.ParMois<number>;
	reseau_collectif: boolean;
}): number {
	const { reseau_collectif } = props;
	const becs = reduceParMois(props.becs) * 1000;
	return reseau_collectif ? becs * 0.112 : 0;
}

/**
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.reseau_collectif : Indique si le réseau est collectif
 * @return Pertes de distribution collective hors du volume chauffé en Wh/mois
 */
export function calcule_qdw_col_hvc(props: {
	becs: Common.ParMois<number>;
	reseau_collectif: boolean;
}): number {
	const { reseau_collectif } = props;
	const becs = reduceParMois(props.becs) * 1000;
	return reseau_collectif ? becs * 0.028 : 0;
}
