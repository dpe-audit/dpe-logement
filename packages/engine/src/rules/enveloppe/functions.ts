import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Enveloppe } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as baie from "#rules/enveloppe/baie/functions.js";
import * as niveau from "#rules/enveloppe/niveau/functions.js";
import * as paroi from "#rules/enveloppe/paroi/functions.js";
import * as pont_thermique from "#rules/enveloppe/pont-thermique/functions.js";
import * as local_non_chauffe from "#rules/enveloppe/local-non-chauffe/functions.js";
import * as ventilation from "#rules/ventilation/functions.js";

/**
 * @param props.dp : {@linkcode calcule_dp}
 * @param props.pt : {@linkcode pont_thermique.calcule_pt}
 * @param props.dr : {@linkcode calcule_dr}
 * @returns Déperditions thermiques totales de l'enveloppe en W/K
 */
export function calcule_gv(props: {
	dp: number;
	pt: number;
	dr: number;
}): number {
	const { dp, pt, dr } = props;
	return dp + pt + dr;
}

/**
 * @param props.dp : {@linkcode calcule_dp}
 * @param props.pt : {@linkcode pont_thermique.calcule_pt}
 * @param props.sdep : {@linkcode paroi.calcule_sdep}
 * @returns Coefficient de transmission thermique moyen en W/(K.m²)
 */
export function calcule_ubat(props: {
	dp: number;
	pt: number;
	sdep: number;
}): number {
	const { dp, pt, sdep } = props;
	return (dp + pt) / sdep;
}

/**
 * @param props.dp_murs : {@linkcode paroi.calcule_dp}
 * @param props.dp_planchers_hauts : {@linkcode paroi.calcule_dp}
 * @param props.dp_planchers_bas : {@linkcode paroi.calcule_dp}
 * @param props.dp_baies : {@linkcode paroi.calcule_dp}
 * @param props.dp_portes : {@linkcode paroi.calcule_dp}
 * @returns Déperditions thermiques totales par les parois en W/K
 */
export function calcule_dp(props: {
	dp_murs: number;
	dp_planchers_hauts: number;
	dp_planchers_bas: number;
	dp_baies: number;
	dp_portes: number;
}): number {
	const dps = Object.values(props);
	return dps.reduce((acc, val) => acc + val, 0);
}

/**
 * @param props.hperm : {@linkcode calcule_hperm}
 * @param props.hvent : {@linkcode ventilation.calcule_hvent}
 * @returns Déperditions thermiques totales par renouvellement d'air en W/K
 */
export function calcule_dr(props: { hperm: number; hvent: number }): number {
	const { hperm, hvent } = props;
	return hperm + hvent;
}

/**
 * @param props.niveaux : Liste des niveaux
 * @param props.niveaux[].inertie : {@linkcode niveau.calcule_inertie}
 * @param props.niveaux[].sh : Surface habitable du niveau
 * @throws {Error} Aucun niveau transmis
 * @returns Inertie de l'enveloppe
 */
export function calcule_inertie(props: {
	niveaux: { inertie: Enveloppe.Common.Inertie; sh: number }[];
}): Enveloppe.Common.Inertie {
	const { niveaux } = props;

	if (niveaux.length === 0) throw new Error("Aucun niveau transmis");

	// Surface totale par inertie
	const surfaceParInertie = new Map<Enveloppe.Common.Inertie, number>();
	for (const niveau of niveaux) {
		const current = surfaceParInertie.get(niveau.inertie) ?? 0;
		surfaceParInertie.set(niveau.inertie, current + niveau.sh);
	}

	// Inerties majoritaires (surface strictement supérieure à toutes les autres)
	const maxSurface = Math.max(...surfaceParInertie.values());
	const inertiesMajoritaires: Enveloppe.Common.Inertie[] = [
		...surfaceParInertie.entries(),
	]
		.filter(([, surface]) => surface === maxSurface)
		.map(([inertie]) => inertie);

	// Une seule inertie majoritaire
	if (inertiesMajoritaires.length === 1)
		return inertiesMajoritaires[0] as Enveloppe.Common.Inertie;

	// Plusieurs inerties majoritaires
	if (!inertiesMajoritaires.includes(Enveloppe.Common.InertieEnum.legere))
		return Enveloppe.Common.InertieEnum.lourde;

	return Enveloppe.Common.InertieEnum.moyenne;
}

/**
 * @param props.qvinf : {@linkcode calcule_qvinf}
 * @returns Déperditions thermiques par renouvellement d'air due au vent en W/K
 */
export function calcule_hperm(props: { qvinf: number }): number {
	const { qvinf } = props;
	return 0.34 * qvinf;
}

/**
 * @param props.exposition : Exposition de l'enveloppe
 * @param props.sh : Surface habitable en m²
 * @param props.hsp : Hauteur sous plafond en m
 * @param props.qvarep_conv : {@linkcode ventilation.calcule_qvarep_conv}
 * @param props.qvasouf_conv : {@linkcode ventilation.calcule_qvasouf_conv}
 * @param props.n50 : {@linkcode calcule_n50}
 * @returns Débit d'air dû aux infiltrations liées au vent en m3/h
 */
export function calcule_qvinf(props: {
	exposition: Enveloppe.Exposition;
	sh: number;
	hsp: number;
	qvarep_conv: number;
	qvasouf_conv: number;
	n50: number;
}): number {
	const { exposition, sh, hsp, qvarep_conv, qvasouf_conv, n50 } = props;

	const e = exposition === Enveloppe.ExpositionEnum.simple ? 0.02 : 0.07;
	const f = exposition === Enveloppe.ExpositionEnum.simple ? 20 : 15;

	return (
		(hsp * sh * e) /
		(1 + (f / e) * ((qvasouf_conv - qvarep_conv) / (hsp * n50)) ** 2)
	);
}

/**
 * @param props.sh : Surface habitable en m²
 * @param props.hsp : Hauteur sous plafond en m
 * @param props.q4pa : {@linkcode calcule_q4pa}
 * @returns Renouvellement d'air sous 50 Pascals en h-1
 */
export function calcule_n50(props: {
	sh: number;
	hsp: number;
	q4pa: number;
}): number {
	const { sh, hsp, q4pa } = props;
	return q4pa / ((4 / 50) ** (2 / 3) * hsp * sh);
}

/**
 * @param props.sh : Surface habitable en m²
 * @param props.q4paenv : {@linkcode calcule_q4paenv}
 * @param props.smea_conv : {@linkcode ventilation.calcule_smea_conv}
 * @returns Perméabilité de la zone sous 4Pa en m3/h
 */
export function calcule_q4pa(props: {
	sh: number;
	q4paenv: number;
	smea_conv: number;
}): number {
	const { sh, q4paenv, smea_conv } = props;
	return 0.45 * smea_conv * sh + q4paenv;
}

/**
 * @param props.sdep : Surface déperditive des parois hors planchers bas en m²
 * @param props.q4paconv : {@linkcode calcule_q4paconv}
 * @returns Perméabilité de l'enveloppe en m3/h
 */
export function calcule_q4paenv(props: {
	sdep: number;
	q4paconv: number;
}): number {
	const { q4paconv, sdep } = props;
	return q4paconv * sdep;
}

/**
 * @param props.type_batiment : Type de bâtiment
 * @param props.annee_construction : Année de construction du bâtiment
 * @param props.isolation_murs_plafonds : {@linkcode calcule_isolation_murs_plafonds}
 * @param props.presence_joints : {@linkcode calcule_presence_joints}
 * @see abaques.enveloppe.permeabilite.q4paconv
 * @throws {ValeurForfaitaireError}
 * @returns Perméabilité de l'enveloppe sous 4Pa en m3/(h.m²)
 */
export function calcule_q4paconv(props: {
	type_batiment: Batiment.TypeBatiment;
	annee_construction: number;
	isolation_murs_plafonds: boolean;
	presence_joints: boolean;
}): number {
	const abaque = abaques.enveloppe.permeabilite.q4paconv;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.q4paconv;
}

/**
 * @param props.surface_murs_plafonds : Surface totale des murs et des plafonds en m²
 * @param props.surface_isolee_murs_plafonds : Surface des murs et des plafonds isolés en m²
 * @returns Isolation majoritaire des murs et des plafonds
 */
export function calcule_isolation_murs_plafonds(props: {
	surface_murs_plafonds: number;
	surface_isolee_murs_plafonds: number;
}): boolean {
	const { surface_murs_plafonds, surface_isolee_murs_plafonds } = props;
	return surface_isolee_murs_plafonds / surface_murs_plafonds > 0.5;
}

/**
 * @param props.ouvertures : Liste des ouvertures
 * @param props.ouvertures[].surface : Surface de l'ouverture en m²
 * @param props.ouvertures[].presence_joint : Présence de joints au niveau de l'ouverture
 * @returns Présence majoritaire de joints au niveau des ouvertures (plus de 50% de la surface totale des ouvertures)
 */
export function calcule_presence_joints(props: {
	ouvertures: { surface: number; presence_joint: boolean | null }[];
}): boolean {
	const { ouvertures } = props;
	const s = ouvertures.reduce((acc, i) => acc + i.surface, 0);
	const w = ouvertures.reduce(
		(acc, i) => acc + (i.presence_joint ? i.surface : 0),
		0,
	);
	return s === 0 ? false : w / s > 0.5;
}

/**
 * @params props.sse : {@linkcode baie.calcule_sse}
 * @params props.sse_ets : {@linkcode local_non_chauffe.calcule_sse}
 * @returns Surface sud équivalente de l'enveloppe en m²/mois
 */
export function calcule_sse(props: {
	sse: number[];
	sse_ets: number[];
}): number {
	const { sse, sse_ets } = props;
	return (
		sse.reduce((acc, sse) => acc + sse, 0) +
		sse_ets.reduce((acc, sse) => acc + sse, 0)
	);
}
