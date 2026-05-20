import { abaques } from "@open-dpe-logement/abaques";
import { Common, type Batiment } from "@open-dpe-logement/models";
import * as climat from "#rules/climat/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import toCEP from "#utils/to-cep.js";
import toEGES from "#utils/to-eges.js";

/**
 * @param props.sh - Surface habitable en m²
 * @param props.nhecl - {@linkcode calcule_nhecl}
 * @returns Consommation d'énergie finale d'éclairage en kWh/an
 */
export function calcule_cef(props: { sh: number; nhecl: number }): number {
	const { sh, nhecl } = props;
	return (0.9 * 1.4 * nhecl * sh) / 1000;
}

/**
 * @param props.cef - Consommation d'énergie finale d'éclairage en kWh/an
 * @return Consommation d'énergie primaire d'éclairage en kWh/an
 */
export function calcule_cep(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	return toCEP({ cef, energie });
}

/**
 * @param props.cef - Consommation d'énergie finale d'éclairage en kWh/an
 * @return Emissions de gaz à effet de serre de l'éclairage en kgCO2eq/an
 */
export function calcule_eges(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	const usage = Common.UsageEnum.eclairage;
	return toEGES({ cef, energie, usage });
}

/**
 * @param props.zone_climatique - {@linkcode climat.calcule_zone_climatique}
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
