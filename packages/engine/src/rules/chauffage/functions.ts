import { Common, Enveloppe } from "@open-dpe-logement/models";
import * as BatimentRule from "#rules/batiment/functions.js";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EnveloppeRule from "#rules/enveloppe/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import * as GenerateurEcsRule from "#rules/ecs/generateur/functions.js";
import * as InstallationEcsRule from "#rules/ecs/installation/functions.js";
import * as GenerateurRule from "#rules/chauffage/generateur/functions.js";
import * as SystemeRule from "#rules/chauffage/systeme/functions.js";
import {
	createParMois,
	mergeParMois,
	type NonEmptyArray,
} from "#utils/helpers.js";

/**
 * @param props.cch - {@linkcode SystemeRule.calcule_cch}
 * @return Consommations de chauffage en kWh/an
 */
export function calcule_cch(props: { cch: number[] }): number {
	return props.cch.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.systemes - Liste des systèmes de chauffage
 * @param props.systemes[].cch - {@linkcode SystemeRule.calcule_cch}
 * @param props.systemes[].energie - Énergie utilisée par le système de chauffage
 * @return Consommation d'électricité de chauffage en kWh/an
 */
export function calcule_cch_elec(props: {
	systemes: NonEmptyArray<{ cch: number; energie: Common.Energie }>;
}): number {
	return props.systemes
		.filter(({ energie }) => energie === Common.EnergieEnum.electricite)
		.reduce((acc, { cch }) => acc + cch, 0);
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
 * @param props.bch_hp : {@linkcode calcule_bch_hp}
 * @param props.qgw_rec :{@linkcode calcule_qgw_rec}
 * @param props.qdw_rec : {@linkcode calcule_qdw_rec}
 * @param props.qgen_ch_rec : {@linkcode GenerateurRule.calcule_qgen_rec}
 * @param props.qgen_ecs_rec : {@linkcode calcule_qgen_ecs_rec}
 * @returns Besoins de chauffage en kWh/mois
 */
export function calcule_bch(props: {
	bch_hp: Common.ParMois<number>;
	qgw_rec: Common.ParMois<number>;
	qdw_rec: Common.ParMois<number>;
	qgen_ch_rec: Common.ParMois<number>[];
	qgen_ecs_rec: Common.ParMois<number>;
}): Common.ParMois<number> {
	return createParMois((mois) => {
		const bch_hp = props.bch_hp[mois];
		const qgw_rec = props.qgw_rec[mois];
		const qdw_rec = props.qdw_rec[mois];
		const qgen_ecs_rec = props.qgen_ecs_rec[mois];
		const qgen_ch_rec = mergeParMois(props.qgen_ch_rec)[mois];
		return bch_hp - (qgw_rec + qdw_rec + qgen_ch_rec + qgen_ecs_rec) / 1000;
	});
}

/**
 * @param props.bv : {@linkcode calcule_bv}
 * @param props.dh : {@linkcode calcule_dh}
 * @returns Besoins de chauffage hors pertes récupérées en kWh/mois
 */
export function calcule_bch_hp(props: {
	bv: Common.ParMois<number>;
	dh: Common.ParMois<number>;
}): Common.ParMois<number> {
	return createParMois((mois) => {
		const bv = props.bv[mois];
		const dh = props.dh[mois];
		return (bv * dh) / 1000;
	});
}

/**
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.f : {@linkcode calcule_f}
 * @returns Besoins mensuels de chauffage en kWh/mois
 */
export function calcule_bv(props: {
	gv: number;
	f: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { gv } = props;
	return createParMois((mois) => {
		const f = props.f[mois];
		return (gv * (1 - f)) / 1000;
	});
}

/**
 * @param props.ratio_proratisation : {@linkcode BatimentRule.calcule_ratio_proratisation}
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.tbase : {@linkcode ClimatRule.calcule_tbase}
 * @return Besoins de chauffage en kW
 */
export function calcule_pch(props: {
	ratio_proratisation: number;
	gv: number;
	tbase: number;
}): number {
	const { ratio_proratisation, gv, tbase } = props;
	return (1.2 * gv * ratio_proratisation * tbase) / (1000 * 0.95 ** 3);
}

/**
 * @param props.inertie : {@linkcode EnveloppeRule.calcule_inertie}
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.dh : {@linkcode calcule_dh}
 * @param props.as : {@linkcode calcule_as}
 * @param props.ai : {@linkcode calcule_ai}
 * @returns Fraction des besoins de chauffage couverts par les apports gratuits
 */
export function calcule_f(props: {
	inertie: Enveloppe.Common.Inertie;
	gv: number;
	dh: Common.ParMois<number>;
	as: Common.ParMois<number>;
	ai: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { inertie, gv } = props;

	return createParMois((mois) => {
		const dh = props.dh[mois];
		const as = props.as[mois];
		const ai = props.ai[mois];
		const x = (as + ai) / (gv * dh);

		switch (inertie) {
			case Enveloppe.Common.InertieEnum.tres_lourde:
				return (x - x ** 3.6) / (1 - x ** 3.6);
			case Enveloppe.Common.InertieEnum.lourde:
				return (x - x ** 3.6) / (1 - x ** 3.6);
			case Enveloppe.Common.InertieEnum.moyenne:
				return (x - x ** 2.9) / (1 - x ** 2.9);
			case Enveloppe.Common.InertieEnum.legere:
				return (x - x ** 2.5) / (1 - x ** 2.5);
		}
	});
}

/**
 * @param props.sse - {@linkcode EnveloppeRule.calcule_sse}
 * @param props.e - {@linkcode ClimatRule.calcule_sollicitations}
 * @returns Apports solaires en Wh/mois
 */
export function calcule_as(props: {
	sse: Common.ParMois<number>;
	e: Common.ParMois<number>;
}): Common.ParMois<number> {
	return createParMois((mois) => {
		const sse = props.sse[mois];
		const e = props.e[mois];
		return sse * e * 1000;
	});
}

/**
 * @param props.sh - Surface habitable en m²
 * @param props.nadeq - {@linkcode EcsRule.calcule_nadeq}
 * @param props.nref - {@linkcode calcule_nref}
 * @returns Apports internes en Wh/mois
 */
export function calcule_ai(props: {
	sh: number;
	nadeq: number;
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { sh, nadeq } = props;
	return createParMois((mois) => {
		const nref = props.nref[mois];
		return ((3.18 + 0.34) * sh + 90 * (132 / 168) * nadeq) * nref;
	});
}

/**
 * @param props.qgw - {@linkcode GenerateurEcsRule.calcule_qgw}
 * @param props.nref - {@linkcode calcule_nref}
 * @returns Pertes de stockage récupérables en Wh/mois
 */
export function calcule_qgw_rec(props: {
	qgw: number[];
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const qgw = props.qgw.reduce((acc, q) => acc + q, 0);
	return createParMois((mois) => {
		const nref = props.nref[mois];
		return 0.48 * nref * (qgw / 8760);
	});
}

/**
 * @param props.qdw_ind_vc : {@linkcode InstallationEcsRule.calcule_qdw_ind_vc}
 * @param props.qdw_col_vc : {@linkcode InstallationEcsRule.calcule_qdw_col_vc}
 * @param props.nref : {@linkcode calcule_nref}
 * @return Pertes de distribution d'eau chaude sanitaire récupérables en Wh/mois
 */
export function calcule_qdw_rec(props: {
	qdw_ind_vc: number[];
	qdw_col_vc: number;
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { qdw_col_vc } = props;
	const qdw_ind_vc = props.qdw_ind_vc.reduce((acc, q) => acc + q, 0);
	return createParMois((mois) => {
		const nref = props.nref[mois];
		return 0.48 * nref * ((qdw_ind_vc + qdw_col_vc) / 8760);
	});
}

/**
 * @param props.qgen : {@linkcode GenerateurEcsRule.calcule_qgen}
 * @param props.nref : {@linkcode calcule_nref}
 * @return Pertes de génération d'eau chaude sanitaire récupérables en Wh/mois
 */
export function calcule_qgen_ecs_rec(props: {
	qgen: number[];
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const qgen = props.qgen.reduce((acc, q) => acc + q, 0);
	return createParMois((mois) => {
		const nref = props.nref[mois];
		const dper = nref * (1790 / 8760);
		return qgen * dper;
	});
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/46
 * @param props.installations - Liste des installations de chauffage
 * @param props.installations[].surface - Surface chauffée par l'installation en m²
 * @param props.installations[].effet_joule - L'installation est-elle à effet joule ?
 * @returns Chauffage majoritaire par effet joule (plus de 50 % de la surface chauffée)
 */
export function calcule_effet_joule(props: {
	installations: { surface: number; effet_joule: boolean }[];
}): boolean {
	const { installations } = props;
	const s = installations.reduce((acc, { surface }) => acc + surface, 0);
	const w = installations.reduce(
		(acc, { surface, effet_joule }) => (effet_joule ? acc + surface : acc),
		0,
	);
	return w / s >= 0.5;
}

/**
 * @param props.sollicitations - {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Nombre d'heures de chauffage en h/mois
 */
export function calcule_nref(props: {
	sollicitations: ClimatRule.Sollicitations;
	scenario: Common.Scenario;
}): Common.ParMois<number> {
	const { sollicitations, scenario } = props;
	return createParMois((mois) => {
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return sollicitations[mois].nref19;
			case Common.ScenarioEnum.depensier:
				return sollicitations[mois].nref21;
		}
	});
}

/**
 * @param props.sollicitations - {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Degrés-heures de chauffage en °C.h/mois
 */
export function calcule_dh(props: {
	sollicitations: ClimatRule.Sollicitations;
	scenario: Common.Scenario;
}): Common.ParMois<number> {
	const { sollicitations, scenario } = props;
	return createParMois((mois) => {
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return sollicitations[mois].dh19;
			case Common.ScenarioEnum.depensier:
				return sollicitations[mois].dh21;
		}
	});
}
