import { Batiment, Common } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as GenerateurRule from "#rules/ecs/generateur/functions.js";
import * as SystemeRule from "#rules/ecs/systeme/functions.js";
import { createParMois, type NonEmptyArray } from "#utils/helpers.js";

/**
 * @param props.cecs - {@linkcode SystemeRule.calcule_cecs}
 * @return Consommations d'eau chaude sanitaire en kWh/an
 */
export function calcule_cecs(props: { cecs: number[] }): number {
	return props.cecs.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.systemes - Liste des systèmes d'eau chaude sanitaire
 * @param props.systemes[].cecs - {@linkcode SystemeRule.calcule_cecs}
 * @param props.systemes[].energie - Énergie utilisée par le système d'eau chaude sanitaire
 * @return Consommation d'électricité d'eau chaude sanitaire en kWh/an
 */
export function calcule_cecs_elec(props: {
	systemes: NonEmptyArray<{ cecs: number; energie: Common.Energie }>;
}): number {
	return props.systemes
		.filter(({ energie }) => energie === Common.EnergieEnum.electricite)
		.reduce((acc, { cecs }) => acc + cecs, 0);
}

/**
 * @param props.caux - {@linkcode GenerateurRule.calcule_caux}
 * @return Consommations des auxiliaires de génération en kWh/an
 */
export function calcule_caux_gen(props: { caux: number[] }): number {
	return props.caux.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.caux_dist - {@linkcode SystemeRule.calcule_caux_dist}
 * @return Consommations des auxiliaires de distribution en kWh/an
 */
export function calcule_caux_dist(props: { caux_dist: number[] }): number {
	return props.caux_dist.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.scenario : Scénario d'usage
 * @param props.nadeq : {@linkcode calcule_nadeq}
 * @param props.nj : {@linkcode ClimatRule.calcule_nj}
 * @param props.tefs : {@linkcode ClimatRule.calcule_sollicitations}
 * @returns Besoins d'eau chaude sanitaire en kWh/mois
 */
export function calcule_becs(props: {
	scenario: Common.Scenario;
	nadeq: number;
	nj: Common.ParMois<number>;
	tefs: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { scenario, nadeq } = props;
	return createParMois((mois) => {
		const tefs = props.tefs[mois];
		const nj = props.nj[mois];
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return (1.163 * nadeq * 56 * (40 - tefs) * nj) / 1000;
			case Common.ScenarioEnum.depensier:
				return (1.163 * nadeq * 79 * (40 - tefs) * nj) / 1000;
		}
	});
}

/**
 * @param props.logements : Nombre de logements
 * @param props.nmax : {@linkcode calcule_nmax}
 * @return Nombre d'adultes équivalent
 */
export function calcule_nadeq(props: {
	logements: number;
	nmax: number;
}): number {
	const { logements, nmax } = props;
	return nmax < 1.75
		? nmax * logements
		: logements * (1.75 + 0.3 * (nmax - 1.75));
}

/**
 * @param props.type_batiment : Type de bâtiment
 * @param props.logements : Nombre de logements
 * @param props.sh : Surface habitable totale en m²
 * @return Coefficient d'occupation maximal
 */
export function calcule_nmax(props: {
	type_batiment: Batiment.TypeBatiment;
	logements: number;
	sh: number;
}): number {
	const { type_batiment, logements, sh } = props;
	const shmoy = sh / logements;

	switch (type_batiment) {
		case Batiment.TypeBatimentEnum.maison:
			if (shmoy < 30) return 1;
			if (shmoy < 70) return 1.75 - 0.01875 * (70 - shmoy);
			return 0.025 * shmoy;

		case Batiment.TypeBatimentEnum.immeuble:
			if (shmoy < 10) return 1;
			if (shmoy < 50) return 1.75 - 0.01875 * (50 - shmoy);
			return 0.035 * shmoy;
	}
}
