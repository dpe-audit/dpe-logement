import { Batiment, Common } from "@open-dpe-logement/models";
import * as climat from "#rules/climat/functions.js";

/**
 * @param props.scenario : Scénario d'usage
 * @param props.nadeq : {@linkcode calcule_nadeq}
 * @param props.nj : {@linkcode climat.calcule_nj}
 * @param props.tefs : {@linkcode climat.calcule_sollicitations}
 * @returns Besoins d'eau chaude sanitaire en kWh/mois
 */
export function calcule_becs(props: {
	scenario: Common.Scenario;
	nadeq: number;
	nj: number;
	tefs: number;
}): number {
	const { scenario, nadeq, tefs, nj } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return (1.163 * nadeq * 56 * (40 - tefs) * nj) / 1000;
		case Common.ScenarioEnum.depensier:
			return (1.163 * nadeq * 79 * (40 - tefs) * nj) / 1000;
	}
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
