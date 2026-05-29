import { Batiment, Common, Production } from "@open-dpe-logement/models";
import * as EclairageRule from "#rules/eclairage/functions.js";
import * as ChauffageRule from "#rules/chauffage/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import * as RefroidissementRule from "#rules/refroidissement/functions.js";
import * as VentilationRule from "#rules/ventilation/functions.js";
import * as PanneauPhotovoltaiqueRule from "./panneau-photovoltaique/functions.js";
import { mergeParMois, reduceParMois } from "#utils/helpers.js";

/**
 * Données par usage
 */
export type ParUsage<T> = {
	[usage in Production.UsageElectricite]: T;
};

/**
 * Coefficient de calage représentant le taux d'auto-production maximum pouvant être atteint lorsque
 * la production d'électricité renouvelable augmente
 */
export const TAPLP: ParUsage<number> = {
	chauffage: 0.02,
	refroidissement: 0.25,
	ecs: 0.05,
	eclairage: 0.02,
	auxiliaires_ventilation: 0.5,
	auxiliaires_distribution: 0.1,
	autres: 0.45,
};

/**
 * @param props.ppv - {@linkcode PanneauPhotovoltaiqueRule.calcule_ppv}
 * @return Production photovoltaïque totale en kWh/an
 */
export function calcule_ppv(props: { ppv: Common.ParMois<number>[] }): number {
	return reduceParMois(mergeParMois(props.ppv));
}

/**
 * @param props.ppv - {@linkcode calcule_ppv}
 * @param props.celec.chauffage - {@linkcode ChauffageRule.calcule_cch_elec} + {@linkcode ChauffageRule.calcule_caux_gen}
 * @param props.celec.ecs - {@linkcode EcsRule.calcule_cecs_elec} + {@linkcode EcsRule.calcule_caux_gen}
 * @param props.celec.refroidissement - {@linkcode RefroidissementRule.calcule_cfr_elec}
 * @param props.celec.eclairage - {@linkcode EclairageRule.calcule_cecl}
 * @param props.celec.auxiliaires_ventilation - {@linkcode VentilationRule.calcule_caux}
 * @param props.celec.auxiliaires_distribution - {@linkcode ChauffageRule.calcule_caux_dist} + {@linkcode EcsRule.calcule_caux_dist}
 * @param props.celec.autres - {@linkcode calcule_celec_autres}
 * @return Électricité photovoltaïque autoconsommée en kWh/an
 */
export function calcule_celec_ac(props: {
	ppv: number;
	celec: ParUsage<number>;
}): ParUsage<number> {
	const { ppv, celec } = props;
	const celec_tot = Object.values(celec).reduce((acc, val) => acc + val, 0);
	const aplp_tot = Object.entries(celec).reduce((acc, [usage, val]) => {
		const tapl = TAPLP[usage as Production.UsageElectricite];
		return acc + val * tapl;
	}, 0);

	const tapl = aplp_tot / celec_tot;
	const tcv = ppv / celec_tot;
	const tap = 1 / (1 / tcv + 1 / tapl);
	const celec_ac_tot = celec_tot * tap;

	return Object.fromEntries(
		Object.entries(celec).map(([usage, celec]) => {
			const celec_ac_i =
				celec_ac_tot *
				((TAPLP[usage as Production.UsageElectricite] * celec) /
					(tapl * celec_tot));
			return [usage, celec_ac_i];
		}),
	) as ParUsage<number>;
}

/**
 * @param props.type_batiment - Type de bâtiment
 * @param props.sh - Surface habitable en m²
 * @return Électricité consommée pour les autres usages en kWh/an
 */
export function calcule_celec_autres(props: {
	type_batiment: Batiment.TypeBatiment;
	sh: number;
}): number {
	const { type_batiment, sh } = props;
	switch (type_batiment) {
		case Batiment.TypeBatimentEnum.maison:
			return sh * 29;
		case Batiment.TypeBatimentEnum.immeuble:
			return sh * (27 + 1.1);
	}
}
