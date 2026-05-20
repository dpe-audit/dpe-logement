import { Common, Enveloppe } from "@open-dpe-logement/models";
import * as climat from "#rules/climat/functions.js";
import * as ecs from "#rules/ecs/functions.js";
import * as enveloppe from "#rules/enveloppe/functions.js";

/**
 * @param props.gv - {@linkcode enveloppe.calcule_gv}
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
	as: number;
	ai: number;
	fut: number;
	rbth: number;
	tint: number;
	textmoy: number;
	nref: number;
}): number {
	const { rbth } = props;
	if (1 / 2 > rbth) return 0;
	const { gv, as, ai, fut, tint, textmoy, nref } = props;
	return (as + ai) / 1000 - fut * (gv / 1000) * (textmoy - tint) * nref;
}

/**
 * @param props.sse - {@linkcode enveloppe.calcule_sse}
 * @param props.e - {@linkcode calcule_e}
 * @returns Apports solaires en Wh/mois
 */
export function calcule_as(props: { sse: number; e: number }): number {
	const { sse, e } = props;
	return sse * e;
}

/**
 * @param props.sh - Surface habitable en m²
 * @param props.nadeq - {@linkcode ecs.calcule_nadeq}
 * @param props.nref - {@linkcode calcule_nref}
 * @returns Apports internes en Wh/mois
 */
export function calcule_ai(props: {
	sh: number;
	nadeq: number;
	nref: number;
}): number {
	const { sh, nadeq, nref } = props;
	return ((3.18 + 0.34) * sh + 90 * (132 / 168) * nadeq) * nref;
}

/**
 * @param props.rbth - {@linkcode calcule_rbth}
 * @param props.t - {@linkcode calcule_t}
 * @returns Facteur d'utilisation des apports pour le mois
 */
export function calcule_fut(props: { rbth: number; t: number }): number {
	const { rbth, t } = props;
	const a = 1 + t / 15;

	if (rbth > 0 && rbth != 1) return (1 - rbth ** -a) / (1 - rbth ** (-a - 1));
	else if (rbth == 1) return a / (a + 1);
	else return 0;
}

/**
 * @param props.gv - {@linkcode enveloppe.calcule_gv}
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
	as: number;
	ai: number;
	cin: number;
	tint: number;
	textmoy: number;
	nref: number;
}): number {
	const { gv, as, ai, tint, textmoy, nref } = props;
	let rbth = gv * (textmoy - tint) * nref;
	rbth = rbth > 0 ? (as + ai) / rbth : 0;
	return rbth >= 0 ? rbth : 0;
}

/**
 * @param props.scenario : Scénario d'usage
 * @param props.sollicitations : {@linkcode climat.calcule_sollicitations}
 * @returns Ensoleillement reçu en période de refroidissement en kWh/m²/mois
 */
export function calcule_e(props: {
	scenario: Common.Scenario;
	sollicitations: climat.Sollicitations;
}): number {
	const { scenario, sollicitations } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return sollicitations.efr28;
		case Common.ScenarioEnum.depensier:
			return sollicitations.efr26;
	}
}

/**
 * @param props.sollicitations - {@linkcode climat.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Température extérieure moyenne en °C
 */
export function calcule_textmoy(props: {
	sollicitations: climat.Sollicitations;
	scenario: Common.Scenario;
}): number | null {
	const { sollicitations, scenario } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return sollicitations.textmoy28;
		case Common.ScenarioEnum.depensier:
			return sollicitations.textmoy26;
	}
}

/**
 * @param props.sollicitations - {@linkcode climat.calcule_sollicitations}
 * @param props.scenario - Scénario d'usage
 * @returns Nombre d'heures de refroidissement en h/mois
 */
export function calcule_nref(props: {
	sollicitations: climat.Sollicitations;
	scenario: Common.Scenario;
}): number {
	const { sollicitations, scenario } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return sollicitations.nref28;
		case Common.ScenarioEnum.depensier:
			return sollicitations.nref26;
	}
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
