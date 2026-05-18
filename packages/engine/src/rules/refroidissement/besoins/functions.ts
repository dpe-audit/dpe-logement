import { Common, Enveloppe } from "@open-dpe-logement/models";

/**
 * @params props.gv - Déperditions thermiques de l'enveloppe en W/K
 * @params props.as - Apports solaires en W
 * @params props.ai - Apports internes en W
 * @params props.fut - Facteur d'utilisation des apports pour le mois
 * @params props.rbth - Ratio de bilan thermique pour le mois
 * @params props.tint - Température de consigne en froid en °C
 * @params props.textmoy - Température extérieure moyenne du mois en °C
 * @params props.nref - Nombre d'heures de refroidissement du mois en h
 * @returns Besoins de refroidissement pour le mois en kWh
 */
export function bfr(props: {
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
 * @params props.rbth - Ratio de bilan thermique pour le mois
 * @params props.t - Constante de temps de la zone pour le refroidissement en h
 * @returns Facteur d'utilisation des apports pour le mois
 */
export function fut(props: { rbth: number; t: number }): number {
	const { rbth, t } = props;
	const a = 1 + t / 15;

	if (rbth > 0 && rbth != 1)
		return (1 - Math.pow(rbth, -a)) / (1 - Math.pow(rbth, -a - 1));
	else if (rbth == 1) return a / (a + 1);
	else return 0;
}

/**
 * @params props.gv - Déperditions thermiques de l'enveloppe en W/K
 * @params props.as - Apports solaires en W
 * @params props.ai - Apports internes en W
 * @params props.cin - Capacité thermique intérieure efficace de la zone J/K
 * @params props.tint - Température de consigne en froid en °C
 * @params props.textmoy - Température extérieure moyenne du mois en °C
 * @params props.nref - Nombre d'heures de refroidissement du mois en h
 * @returns Ratio de bilan thermique pour le mois
 */
export function rbth(props: {
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
 * @params props.scenario - Scénario d'usage
 * @returns Température de consigne en froid en °C
 */
export function tint(props: { scenario: Common.Scenario }): number {
	const { scenario } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return 28;
		case Common.ScenarioEnum.depensier:
			return 26;
	}
}

/**
 * @params props.gv - Déperditions thermiques de l'enveloppe en W/K
 * @params props.cin - Capacité thermique intérieure efficace de la zone J/K
 * @returns Constante de temps de la zone pour le refroidissement en h
 */
export function t(props: { gv: number; cin: number }): number {
	const { gv, cin } = props;
	return gv > 0 ? cin / (3600 * gv) : 0;
}

/**
 * @params props.sh - Surface habitable(m²)
 * @params props.inertie - Inertie de l'enveloppe
 * @returns Capacité thermique intérieure efficace de la zone J/K
 */
export function cin(props: {
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
