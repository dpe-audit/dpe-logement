import { abaques } from "@open-dpe-logement/abaques";
import { Common, Ecs } from "@open-dpe-logement/models";
import * as climat from "#rules/climat/functions.js";
import * as ecs from "#rules/ecs/functions.js";
import * as generateur from "#rules/ecs/generateur/functions.js";
import * as systeme from "#rules/ecs/systeme/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { evaluate } from "#utils/evaluate.js";
import toCEP from "#utils/to-cep.js";
import toEGES from "#utils/to-eges.js";

/**
 * @param props.qaux : {@linkcode calcule_qaux}
 * @param props.qcirb : {@linkcode calcule_qcirb}
 * @param props.qtrac : {@linkcode calcule_qtrac}
 * @return Consommations d'énergie finale des auxiliaires d'eau chaude sanitaire en kWh/an
 */
export function cef(props: {
	qaux: number;
	qcirb: number;
	qtrac: number;
}): number {
	const { qaux, qcirb, qtrac } = props;
	return (qaux + qcirb + qtrac) / 1000;
}

/**
 * @param props.cef : {@linkcode cef}
 * @return Consommations d'énergie primaire des auxiliaires d'eau chaude sanitaire en kWh/an
 */
export function cep(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	return toCEP({ cef, energie });
}

/**
 * @param props.cef : {@linkcode cef}
 * @return Emissions de gaz à effet de serre des auxiliaires d'eau chaude sanitaire en kgCO2eq/an
 */
export function eges(props: { cef: number }): number {
	const { cef } = props;
	const energie = Common.EnergieEnum.electricite;
	const usage = Common.UsageEnum.auxiliaire;
	return toEGES({ cef, energie, usage });
}

/**
 * @param props.type_generateur : {@linkcode generateur.set_type_generateur}
 * @param props.energie_generateur : {@linkcode generateur.set_energie_generateur}
 * @param props.presence_ventouse : {@linkcode generateur.set_presence_ventouse}
 * @param props.pn : {@linkcode generateur.calcule_pn}
 * @see abaques.ecs.paux
 * @throws {ValeurForfaitaireError}
 * @return Puissance de l'auxiliaire de génération d'eau chaude sanitaire en kW
 */
export function calcule_paux(props: {
	type_generateur: Ecs.Generateur.TypeGenerateur;
	energie_generateur: Ecs.Generateur.EnergieEcs;
	presence_ventouse: boolean | null;
	pn: number;
}): number {
	const { pn, ...query } = props;
	const abaque = abaques.ecs.paux;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	const G = match.G;
	const H = match.H;
	const Pn = match.pn_max ? Math.min(match.pn_max, pn) : pn;
	const scope = { G, H, Pn };
	return evaluate(match.paux, scope);
}

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.pn : {@linkcode generateur.calcule_pn}
 * @param props.paux : {@linkcode generateur.calcule_paux}
 * @param props.rdim : {@linkcode generateur.calcule_rdim}
 * @return Consommations de l'auxiliaire de génération d'eau chaude sanitaire en Wh/an
 */
export function calcule_qaux(props: {
	becs: number;
	pn: number;
	paux: number;
	rdim: number;
}): number {
	const { pn, paux, rdim } = props;
	const becs = props.becs * 1000;
	return (paux * becs * rdim) / pn;
}

/**
 * @param props.qdw_ind_vc : {@linkcode calcule_qdw_ind_vc}
 * @param props.qdw_col_vc : {@linkcode calcule_qdw_col_vc}
 * @param props.qdw_col_hvc : {@linkcode calcule_qdw_col_hvc}
 * @return Pertes de distribution d'eau chaude sanitaire en volume chauffé en Wh/mois
 */
export function calcule_qdw(props: {
	qdw_ind_vc: number;
	qdw_col_vc: number;
	qdw_col_hvc: number;
}): number {
	const { qdw_ind_vc, qdw_col_vc, qdw_col_hvc } = props;
	return qdw_ind_vc + qdw_col_vc + qdw_col_hvc;
}

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.sh : Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.lvc : {@linkcode calcule_lvc}
 * @return Pertes de distribution individuelle en volume chauffé en Wh/mois
 */
export function calcule_qdw_ind_vc(props: {
	becs: number;
	sh: number;
	lvc: number;
}): number {
	const { sh, lvc } = props;
	const becs = props.becs * 1000;
	return ((0.5 * lvc) / sh) * becs;
}

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.reseau_collectif : Indique si le réseau est collectif
 * @return Pertes de distribution collective en volume chauffé en Wh/mois
 */
export function calcule_qdw_col_vc(props: {
	becs: number;
	reseau_collectif: boolean;
}): number {
	const { reseau_collectif } = props;
	const becs = props.becs * 1000;
	return reseau_collectif ? becs * 0.112 : 0;
}

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.reseau_collectif : Indique si le réseau est collectif
 * @return Pertes de distribution collective hors du volume chauffé en Wh/mois
 */
export function calcule_qdw_col_hvc(props: {
	becs: number;
	reseau_collectif: boolean;
}): number {
	const { reseau_collectif } = props;
	const becs = props.becs * 1000;
	return reseau_collectif ? becs * 0.028 : 0;
}

/**
 * @param props.sh : Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.n_systemes : Nombre de systèmes d'eau chaude sanitaire associés à l'installation
 * @return Longueur du réseau d'eau chaude sanitaire en volume chauffé en m
 */
export function calcule_lvc(props: { sh: number; n_systemes: number }): number {
	const { sh, n_systemes } = props;
	return 0.2 * sh * (1 / n_systemes);
}

/**
 * @param props.nj : {@linkcode climat.calcule_nj}
 * @param props.sh : Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.qdw : {@linkcode calcule_qdw}
 * @param props.bouclage : {@linkcode systeme.set_bouclage_reseau}
 * @param props.niveaux_desservis : Nombre de niveaux desservis par l'installation d'eau chaude sanitaire
 * @return Consommations du circulateur d'eau chaude sanitaire en Wh/mois
 */
export function calcule_qcirb(props: {
	nj: number;
	sh: number;
	qdw: number;
	bouclage: Ecs.Systeme.Bouclage;
	niveaux_desservis: number;
}): number {
	const { bouclage } = props;
	if (bouclage !== Ecs.Systeme.BouclageEnum.boucle) return 0;

	const { nj, sh, qdw, niveaux_desservis } = props;
	const nh = nj * 24;
	const nh_puisage = nj * 5;
	const lb = Math.sqrt(sh / niveaux_desservis) + 6 * (niveaux_desservis - 0.5);
	const delta_pb = 0.2 * lb + 10;
	const phyd = (qdw * delta_pb) / 3.6;
	const effcircb = phyd ** 0.324 / 15.3;
	const pcircb = Math.max(20, phyd / effcircb);
	return nh_puisage * pcircb + (nh - nh_puisage) * 20;
}

/**
 * @param props.becs : {@linkcode ecs.calcule_becs}
 * @param props.bouclage : {@linkcode systeme.set_bouclage_reseau}
 * @return Consommation du traçueur d'eau chaude sanitaire en Wh/an
 */
export function calcule_qtrac(props: {
	becs: number;
	bouclage: Ecs.Systeme.Bouclage;
}): number {
	const { bouclage } = props;
	if (bouclage !== Ecs.Systeme.BouclageEnum.trace) return 0;
	const becs = props.becs * 1000;
	return becs * 0.14;
}
