import { abaques } from "@open-dpe-logement/abaques";
import { Batiment } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";

/**
 * @param props.sh - Surface habitable en m²
 * @param props.nhecl - {@linkcode calcule_nhecl}
 * @returns Consommation d'éclairage en kWh/an
 */
export function calcule_cecl(props: { sh: number; nhecl: number }): number {
	const { sh, nhecl } = props;
	return (0.9 * 1.4 * nhecl * sh) / 1000;
}

/**
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @see abaques.eclairage.nhecl
 * @throws {ValeurForfaitaireError}
 * @returns Nombre d'heures d'éclairage en heures/an
 */
export function calcule_nhecl(props: {
	zone_climatique: Batiment.ZoneClimatique;
}): number {
	const abaque = abaques.eclairage.nhecl;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.nhecl;
}
