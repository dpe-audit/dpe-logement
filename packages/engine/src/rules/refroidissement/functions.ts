import { Common, Enveloppe } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import * as EnveloppeRule from "#rules/enveloppe/functions.js";
import * as GenerateurRule from "#rules/refroidissement/generateur/functions.js";
import { createParMois, type NonEmptyArray } from "#utils/helpers.js";

/**
 * @param props.cfr - {@linkcode GenerateurRule.calcule_cfr}
 * @return Consommations des générateurs de refroidissement en kWh/an
 */
export function calcule_cfr(props: { cfr: number[] }): number {
	return props.cfr.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.systemes - Liste des systèmes de refroidissement
 * @param props.systemes[].cfr - {@linkcode GenerateurRule.calcule_cfr}
 * @param props.systemes[].energie - Énergie utilisée par le système de refroidissement
 * @return Consommation d'électricité de refroidissement en kWh/an
 */
export function calcule_cfr_elec(props: {
	systemes: NonEmptyArray<{ cfr: number; energie: Common.Energie }>;
}): number {
	return props.systemes
		.filter(({ energie }) => energie === Common.EnergieEnum.electricite)
		.reduce((acc, { cfr }) => acc + cfr, 0);
}

/**
 * @param props.caux - {@linkcode GenerateurRule.calcule_caux}
 * @return Consommations des auxiliaires de refroidissement en kWh/an
 */
export function calcule_caux(props: { caux: number[] }): number {
	return props.caux.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.gv - {@linkcode EnveloppeRule.calcule_gv}
 * @param props.as - {@linkcode calcule_as}
 * @param props.ai - {@linkcode calcule_ai}
 * @param props.fut - {@linkcode calcule_fut}
 * @param props.rbth - {@linkcode calcule_rbth}
 * @param props.tint - {@linkcode calcule_tint}
 * @param props.textmoy - {@linkcode calcule_textmoy}
 * @param props.nref - {@linkcode calcule_nref}
 * @returns Besoins de refroidissement en kWh/mois
 */
export function calcule_bfr(props: {
	gv: number;
	tint: number;
	as: Common.ParMois<number>;
	ai: Common.ParMois<number>;
	fut: Common.ParMois<number>;
	rbth: Common.ParMois<number>;
	textmoy: Common.ParMois<number>;
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { gv, tint } = props;
	return createParMois((mois: Common.Mois) => {
		const rbth = props.rbth[mois];
		const as = props.as[mois];
		const ai = props.ai[mois];
		const fut = props.fut[mois];
		const textmoy = props.textmoy[mois];
		const nref = props.nref[mois];

		if (1 / 2 > rbth) return 0;
		return (as + ai) / 1000 - fut * (gv / 1000) * (textmoy - tint) * nref;
	});
}

/**
 * @param props.rbth - {@linkcode calcule_rbth}
 * @param props.t - {@linkcode calcule_t}
 * @returns Facteur d'utilisation des apports pour le mois
 */
export function calcule_fut(props: {
	rbth: Common.ParMois<number>;
	t: number;
}): Common.ParMois<number> {
	const { t } = props;
	const a = 1 + t / 15;
	return createParMois((mois: Common.Mois) => {
		const rbth = props.rbth[mois];
		if (rbth > 0 && rbth != 1) return (1 - rbth ** -a) / (1 - rbth ** (-a - 1));
		else if (rbth == 1) return a / (a + 1);
		else return 0;
	});
}

/**
 * @param props.gv - {@linkcode EnveloppeRule.calcule_gv}
 * @param props.as - {@linkcode calcule_as}
 * @param props.ai - {@linkcode calcule_ai}
 * @param props.cin - {@linkcode calcule_cin}
 * @param props.tint - {@linkcode calcule_tint}
 * @param props.textmoy - {@linkcode calcule_textmoy}
 * @param props.nref - {@linkcode calcule_nref}
 * @returns Ratio de bilan thermique pour le mois
 */
export function calcule_rbth(props: {
	gv: number;
	as: Common.ParMois<number>;
	ai: Common.ParMois<number>;
	cin: number;
	tint: number;
	textmoy: Common.ParMois<number | null>;
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { gv, tint } = props;

	return createParMois((mois: Common.Mois) => {
		const textmoy = props.textmoy[mois];
		const nref = props.nref[mois];
		const as = props.as[mois];
		const ai = props.ai[mois];

		if (textmoy === null) return 0;
		let rbth = gv * (textmoy - tint) * nref;
		rbth = rbth > 0 ? (as + ai) / rbth : 0;
		return rbth >= 0 ? rbth : 0;
	});
}

/**
 * @param props.sse - {@linkcode EnveloppeRule.calcule_sse}
 * @param props.e - {@linkcode calcule_e}
 * @returns Apports solaires en Wh/mois
 */
export function calcule_as(props: {
	sse: Common.ParMois<number>;
	e: Common.ParMois<number>;
}): Common.ParMois<number> {
	return createParMois((mois: Common.Mois) => {
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
	return createParMois((mois: Common.Mois) => {
		const nref = props.nref[mois];
		return ((3.18 + 0.34) * sh + 90 * (132 / 168) * nadeq) * nref;
	});
}

/**
 * @param props.scenario : Scénario d'usage
 * @param props.sollicitations : {@linkcode ClimatRule.calcule_sollicitations}
 * @returns Ensoleillement reçu en période de refroidissement en kWh/m²/mois
 */
export function calcule_e(props: {
	scenario: Common.Scenario;
	sollicitations: ClimatRule.Sollicitations;
}): Common.ParMois<number> {
	const { scenario, sollicitations } = props;
	return createParMois((mois: Common.Mois) => {
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return sollicitations[mois].efr28;
			case Common.ScenarioEnum.depensier:
				return sollicitations[mois].efr26;
		}
	});
}

/**
 * @param props.sollicitations - {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Température extérieure moyenne en °C
 */
export function calcule_textmoy(props: {
	sollicitations: ClimatRule.Sollicitations;
	scenario: Common.Scenario;
}): Common.ParMois<number | null> {
	const { sollicitations, scenario } = props;
	return createParMois((mois: Common.Mois) => {
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return sollicitations[mois].textmoy28;
			case Common.ScenarioEnum.depensier:
				return sollicitations[mois].textmoy26;
		}
	});
}

/**
 * @param props.sollicitations - {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Nombre d'heures de refroidissement en h/mois
 */
export function calcule_nref(props: {
	sollicitations: ClimatRule.Sollicitations;
	scenario: Common.Scenario;
}): Common.ParMois<number> {
	const { sollicitations, scenario } = props;
	return createParMois((mois: Common.Mois) => {
		switch (scenario) {
			case Common.ScenarioEnum.conventionnel:
				return sollicitations[mois].nref28;
			case Common.ScenarioEnum.depensier:
				return sollicitations[mois].nref26;
		}
	});
}

/**
 * @param props.scenario - Scénario d'usage
 * @returns Température de consigne en froid en °C
 */
export function calcule_tint(props: { scenario: Common.Scenario }): number {
	const { scenario } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return 28;
		case Common.ScenarioEnum.depensier:
			return 26;
	}
}

/**
 * @param props.gv - {@linkcode enveloppe.calcule_gv}
 * @param props.cin - {@linkcode calcule_cin}
 * @returns Constante de temps de la zone pour le refroidissement en h
 */
export function calcule_t(props: { gv: number; cin: number }): number {
	const { gv, cin } = props;
	return gv > 0 ? cin / (3600 * gv) : 0;
}

/**
 * @param props.sh - Surface habitable(m²)
 * @param props.inertie - {@linkcode enveloppe.calcule_inertie}
 * @returns Capacité thermique intérieure efficace de la zone J/K
 */
export function calcule_cin(props: {
	sh: number;
	inertie: Enveloppe.Common.Inertie;
}): number {
	const { sh, inertie } = props;

	switch (inertie) {
		case Enveloppe.Common.InertieEnum.legere:
			return 110000 * sh;
		case Enveloppe.Common.InertieEnum.moyenne:
			return 165000 * sh;
		case Enveloppe.Common.InertieEnum.lourde:
			return 260000 * sh;
		case Enveloppe.Common.InertieEnum.tres_lourde:
			return 260000 * sh;
	}
}
