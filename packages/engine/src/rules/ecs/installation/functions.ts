import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Ecs } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as climat from "#rules/climat/functions.js";
import * as ecs from "#rules/ecs/functions.js";

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @returns Besoins d'eau chaude sanitaire proratisés à l'installation en kWh/mois
 */
export function calcule_becs(props: { becs: number; rdim: number }): number {
	const { becs, rdim } = props;
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
 * @param props.zone_climatique - {@linkcode climat.calcule_zone_climatique}
 * @param props.type_batiment - Type de bâtiment
 * @param props.usage_solaire - Usage du solaire thermique
 * @param props.anciennete_installation - Ancienneté de l'installation solaire en année
 * @returns Facteur de couverture solaire de l'installation d'eau chaude sanitaire
 */
export function calcule_fecs(props: {
	zone_climatique: Batiment.ZoneClimatique;
	type_batiment: Batiment.TypeBatiment;
	usage_solaire: Ecs.Installation.UsageSolaire;
	anciennete_installation: number;
}): number {
	const abaque = abaques.ecs.fecs;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.fecs;
}
