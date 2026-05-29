import { ValeurForfaitaireError } from "#utils/errors.js";
import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Common } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import {
	containsAllMois,
	createParMois,
	createParMoisFrom,
	mapParMois,
} from "#utils/helpers.js";

/**
 * @param props.spv - {@linkcode calcule_spv}
 * @param props.epv - {@linkcode calcule_epv}
 * @param props.kpv - {@linkcode calcule_kpv}
 * @returns Production du panneau photovoltaïque en kWh/mois
 */
export function calcule_ppv(props: {
	spv: number;
	kpv: number;
	epv: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { spv, kpv } = props;
	return createParMois((mois) => kpv * spv * 0.17 * props.epv[mois] * 0.86);
}

/**
 * @param props.surface - Surface du panneau photovoltaïque en m²
 * @param props.modules - Nombre de modules photovoltaïques
 * @returns Surface du panneau photovoltaïque en m²
 */
export function calcule_spv(props: {
	surface: number | null;
	modules: number;
}): number {
	const { surface, modules } = props;
	return surface ? surface * modules : 1.6 * modules;
}

/**
 * @param props.orientation - Orientation du panneau photovoltaïque
 * @param props.inclinaison - Inclinaison du panneau photovoltaïque en degrés
 * @see abaques.production.kpv
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de pondération prenant en compte l'altération par rapport à l'orientation optimale du panneau photovoltaïque
 */
export function calcule_kpv(props: {
	orientation: Common.Orientation;
	inclinaison: number;
}): number {
	const abaque = abaques.production.kpv;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.kpv;
}

/**
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @see abaques.production.epv
 * @throws {ValeurForfaitaireError}
 * @returns Ensoleillement mensuel pour chaque mois de l'année en kWh/m²
 */
export function calcule_epv(props: {
	zone_climatique: Batiment.ZoneClimatique;
}): Common.ParMois<number> {
	const abaque = abaques.production.epv;
	const matches = abaque.search(props, abaque.load());
	if (!containsAllMois(matches)) throw new ValeurForfaitaireError(props);
	return mapParMois(createParMoisFrom(matches), (value) => value.epv);
}
