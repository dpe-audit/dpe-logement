import { abaques } from "@open-dpe-logement/abaques";
import { Common, Ecs } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import toEGES from "#utils/to-eges.js";
import toCEP from "#utils/to-cep.js";
import * as generateur from "#rules/ecs/generateur/functions.js";
import * as installation from "#rules/ecs/installation/functions.js";

/**
 * @param props.becs : {@linkcode installation.calcule_becs}
 * @param props.fecs : {@linkcode installation.calcule_fecs}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @param props.iecs : {@linkcode calcule_iecs}
 * @returns Consommation d'énergie finale du système d'eau chaude sanitaire en kWh/mois
 */
export function calcule_cef(props: {
	becs: number;
	fecs: number;
	rdim: number;
	iecs: number;
}): number {
	const { becs, fecs, rdim, iecs } = props;
	return becs * (1 - fecs) * iecs * rdim;
}

/**
 * @param props.cef : {@linkcode calcule_cef}
 * @param props.energie : {@linkcode generateur.set_energie_generateur}
 * @return Consommation d'énergie primaire du système d'eau chaude sanitaire en kWh
 */
export function calcule_cep(props: {
	cef: number;
	energie: Common.Energie;
}): number {
	const { cef, energie } = props;
	return toCEP({ cef, energie });
}

/**
 * @param props.cef : {@linkcode calcule_cef}
 * @param props.energie : {@linkcode generateur.set_energie_generateur}
 * @param props.reseau_id : Identifiant du réseau de froid
 * @return Emissions de gaz à effet de serre du système d'eau chaude sanitaire en kgCO2eq
 */
export function calcule_eges(props: {
	cef: number;
	energie: Common.Energie;
	reseau_id: string | null;
}): number {
	const { cef, energie, reseau_id } = props;
	const usage = Common.UsageEnum.ecs;
	return toEGES({ cef, energie, usage, reseau_id });
}

/**
 * @param props.n_generateurs - Nombre de générateurs d'eau chaude sanitaire associés à l'installation
 * @returns Ratio de dimensionnement du système d'eau chaude sanitaire
 */
export function calcule_rdim(props: { n_generateurs: number }): number {
	const { n_generateurs } = props;
	return 1 / n_generateurs;
}

/**
 * @param props.rd : {@linkcode calcule_rd}
 * @param props.rg : {@linkcode calcule_rgs}
 * @param props.rgs : {@linkcode calcule_rgs}
 * @param props.rs : {@linkcode calcule_rgs}
 * @returns Inverse du rendement du système d'eau chaude sanitaire
 */
export function calcule_iecs(props: {
	rd: number;
	rg: number;
	rgs: number;
	rs: number;
}): number {
	const { rd, rg, rgs, rs } = props;
	return rd * rg * rgs * rs;
}

/**
 * @param props.reseau_collectif - Réseau collectif d'eau chaude sanitaire
 * @param props.bouclage_reseau - {@linkcode set_bouclage_reseau}
 * @param props.alimentation_contigue - Alimentation contigue du réseau de distribution d'eau chaude sanitaire
 * @param props.production_volume_habitable - Production d'eau chaude sanitaire à l'intérieur du volume habitable
 * @see abaques.ecs.rd
 * @throws {ValeurForfaitaireError}
 * @returns Rendement de distribution du système d'eau chaude sanitaire
 */
export function calcule_rd(props: {
	reseau_collectif: boolean;
	bouclage_reseau: Ecs.Systeme.Bouclage | null;
	alimentation_contigue: boolean | null;
	production_volume_habitable: boolean;
}): number {
	const abaque = abaques.ecs.rd;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.rd;
}

/**
 * @param props.position_chauffe_eau : Position du chauffe-eau
 * @param props.label_generateur : Label du générateur d'eau chaude sanitaire
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @return Rendement de stockage du système d'eau chaude sanitaire
 */
export function calcule_rs(props: {
	position_chauffe_eau: Ecs.Generateur.PositionChauffeEau | null;
	label_generateur: Ecs.Generateur.Label | null;
	rd: number;
	becs: number;
	qgw: number;
}): number {
	const { position_chauffe_eau, label_generateur, rd, qgw } = props;
	const becs = props.becs * 1000;

	const isChauffeEauVertical =
		position_chauffe_eau ===
		Ecs.Generateur.PositionChauffeEauEnum.chauffe_eau_vertical;
	const hasLabel =
		label_generateur === Ecs.Generateur.LabelEnum.ne_performance_c;

	return isChauffeEauVertical && hasLabel
		? 1.08 / (1 + (qgw * rd) / becs)
		: 1 / (1 + (qgw * rd) / becs);
}

export type RgsResult = {
	rg: number;
	rs: number;
	rgs: number;
};

/**
 * @param props - {@linkcode Systeme}
 * @return Rendement de génération, de stockage et de génération et stockage du système d'eau chaude sanitaire
 */
export function calcule_rgs(props: ChaudiereMultiBatiment): RgsResult;
export function calcule_rgs(props: ReseauChaleur): RgsResult;
export function calcule_rgs(props: SystemeThermodynamique): RgsResult;
export function calcule_rgs(props: SystemeElectrique): RgsResult;
export function calcule_rgs(props: ChauffeEauGaz): RgsResult;
export function calcule_rgs(props: ChaudiereCombustion): RgsResult;
export function calcule_rgs(props: Systeme): RgsResult {
	const result = { rg: 1, rs: 1, rgs: 1 };

	switch (true) {
		case isChaudiereMultiBatiment(props) || isReseauChaleur(props):
			result.rgs = calcule_rgs_reseau_chaleur(props);
			return result;
		case isSystemeThermodynamique(props):
			result.rgs = calcule_rgs_systeme_thermodynamique(props);
			return result;
		case isSystemeElectrique(props):
			result.rg = calcule_rg_systeme_electrique(props);
			result.rs = calcule_rs(props);
			return result;
		case isChauffeEauGaz(props):
			if (props.qgw > 0) {
				result.rgs = calcule_rgs_accumulateur_gaz(props);
				return result;
			}
			result.rg = calcule_rg_chauffe_eau_gaz(props);
			result.rs = 1;
			return result;
		case isChaudiereCombustion(props):
			result.rgs = calcule_rgs_chaudiere_mixte(props);
			return result;
		default:
			throw new Error(`Système non couvert : ${JSON.stringify(props)}`);
	}
}

/**
 * @param props.becs : {@linkcode installation.calcule_becs}
 * @param props.qgw : {@linkcode generateur.calcule_qgw}
 * @param props.rpn : {@linkcode generateur.calcule_combustion}
 * @param props.qp0 : {@linkcode generateur.calcule_combustion}
 * @param props.pveilleuse : {@linkcode generateur.calcule_combustion}
 * @returns Rendement de génération et de stockage de la chaudière mixte
 */
export function calcule_rgs_chaudiere_mixte(props: {
	becs: number;
	qgw: number;
	rpn: number;
	qp0: number;
	pveilleuse: number;
}): number {
	const { qgw, rpn, qp0, pveilleuse } = props;
	const becs = props.becs * 1000;
	return (
		1 /
		(1 / rpn + (1790 * qp0 + qgw) / becs + 6970 * ((0.5 * pveilleuse) / becs))
	);
}

/**
 * @param props.becs : {@linkcode installation.calcule_becs}
 * @param props.qgw : {@linkcode generateur.calcule_qgw}
 * @param props.rpn : {@linkcode generateur.calcule_combustion}
 * @param props.qp0 : {@linkcode generateur.calcule_combustion}
 * @param props.pveilleuse : {@linkcode generateur.calcule_combustion}
 * @returns Rendement de génération et de stockage de l'accumulateur gaz
 */
export function calcule_rgs_accumulateur_gaz(props: {
	becs: number;
	qgw: number;
	rpn: number;
	qp0: number;
	pveilleuse: number;
}): number {
	const { qgw, rpn, qp0, pveilleuse } = props;
	const becs = props.becs * 1000;
	return 1 / (1 / rpn + (8592 * qp0 + qgw) / becs + 6970 * (pveilleuse / becs));
}

/**
 * @param props.cop : {@linkcode generateur.calcule_cop}
 * @returns Rendement de génération et de stockage du système thermodynamique
 */
export function calcule_rgs_systeme_thermodynamique(props: {
	cop: number;
}): number {
	return props.cop;
}

/**
 * @param props.isolation_reseau : {@linkcode installation.set_isolation_reseau}
 * @return Rendement de génération et de stockage du réseau de chaleur et des générateurs multi-bâtiment
 */
export function calcule_rgs_reseau_chaleur(props: {
	isolation_reseau: boolean;
}): number {
	const { isolation_reseau } = props;
	return isolation_reseau ? 0.9 : 0.75;
}

/**
 * @param props.becs : {@linkcode installation.calcule_becs}
 * @param props.rpn : {@linkcode generateur.calcule_combustion}
 * @param props.qp0 : {@linkcode generateur.calcule_combustion}
 * @param props.pveilleuse : {@linkcode generateur.calcule_combustion}
 * @returns Rendement de génération du chauffe-eau gaz
 */
export function calcule_rg_chauffe_eau_gaz(props: {
	becs: number;
	rpn: number;
	qp0: number;
	pveilleuse: number;
}): number {
	const { rpn, qp0, pveilleuse } = props;
	const becs = props.becs * 1000;
	let rg: number = 1 / rpn;
	rg += 1790 * (qp0 / becs);
	rg += 6970 * (pveilleuse / becs);
	return 1 / rg;
}

/**
 * @param props.type_generateur : {@linkcode generateur.set_type_generateur}
 * @return Rendement de génération du système électrique
 */
export function calcule_rg_systeme_electrique(props: {
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.chauffe_eau
		| typeof Ecs.Generateur.TypeGenerateurEnum.chaudiere;
}): number {
	const { type_generateur } = props;
	return type_generateur === Ecs.Generateur.TypeGenerateurEnum.chaudiere
		? 0.97
		: 1;
}

/**
 * @typedef {ChaudiereMultiBatiment | ReseauChaleur | SystemeThermodynamique | SystemeElectrique | ChauffeEauGaz | ChaudiereCombustion} Systeme
 */
export type Systeme =
	| ChaudiereMultiBatiment
	| ReseauChaleur
	| SystemeThermodynamique
	| SystemeElectrique
	| ChauffeEauGaz
	| ChaudiereCombustion;

export type ChaudiereMultiBatiment = {
	generateur_multi_batiment: true;
	isolation_reseau: boolean;
};
export function isChaudiereMultiBatiment(
	props: Systeme,
): props is ChaudiereMultiBatiment {
	return (
		"generateur_multi_batiment" in props &&
		props.generateur_multi_batiment === true
	);
}

export type ReseauChaleur = {
	type_generateur: typeof Ecs.Generateur.TypeGenerateurEnum.reseau_chaleur;
	isolation_reseau: boolean;
};
export function isReseauChaleur(props: Systeme): props is ReseauChaleur {
	return (
		"type_generateur" in props &&
		props.type_generateur === Ecs.Generateur.TypeGenerateurEnum.reseau_chaleur
	);
}

export type SystemeThermodynamique = {
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_ambiant
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_extrait
		| typeof Ecs.Generateur.TypeGenerateurEnum.pac_double_service
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_exterieur;
	cop: number;
};
export function isSystemeThermodynamique(
	props: Systeme,
): props is SystemeThermodynamique {
	if (!("type_generateur" in props)) {
		return false;
	}
	const { type_generateur } = props;
	return (
		type_generateur === Ecs.Generateur.TypeGenerateurEnum.cet_air_ambiant ||
		type_generateur === Ecs.Generateur.TypeGenerateurEnum.cet_air_extrait ||
		type_generateur === Ecs.Generateur.TypeGenerateurEnum.pac_double_service ||
		type_generateur === Ecs.Generateur.TypeGenerateurEnum.cet_air_exterieur
	);
}

export type SystemeElectrique = {
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.chaudiere
		| typeof Ecs.Generateur.TypeGenerateurEnum.chauffe_eau;
	energie_generateur: typeof Ecs.Generateur.EnergieEcsEnum.electricite;
	position_chauffe_eau: Ecs.Generateur.PositionChauffeEau | null;
	label_generateur: Ecs.Generateur.Label | null;
	rd: number;
	becs: number;
	qgw: number;
};
export function isSystemeElectrique(
	props: Systeme,
): props is SystemeElectrique {
	if (!("type_generateur" in props) || !("energie_generateur" in props)) {
		return false;
	}
	if (props.energie_generateur !== Ecs.Generateur.EnergieEcsEnum.electricite) {
		return false;
	}
	return (
		props.type_generateur === Ecs.Generateur.TypeGenerateurEnum.chaudiere ||
		props.type_generateur === Ecs.Generateur.TypeGenerateurEnum.chauffe_eau
	);
}

export type ChauffeEauGaz = {
	type_generateur: typeof Ecs.Generateur.TypeGenerateurEnum.chauffe_eau;
	energie_generateur:
		| typeof Ecs.Generateur.EnergieEcsEnum.gaz_naturel
		| typeof Ecs.Generateur.EnergieEcsEnum.gpl;
	rpn: number;
	qp0: number;
	pveilleuse: number;
	becs: number;
	qgw: number;
};
export function isChauffeEauGaz(props: Systeme): props is ChauffeEauGaz {
	if (!("type_generateur" in props) || !("energie_generateur" in props)) {
		return false;
	}
	if (props.type_generateur !== Ecs.Generateur.TypeGenerateurEnum.chauffe_eau) {
		return false;
	}
	return (
		props.energie_generateur === Ecs.Generateur.EnergieEcsEnum.gaz_naturel ||
		props.energie_generateur === Ecs.Generateur.EnergieEcsEnum.gpl
	);
}

export type ChaudiereCombustion = {
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.chaudiere
		| typeof Ecs.Generateur.TypeGenerateurEnum.poele_bouilleur
		| typeof Ecs.Generateur.TypeGenerateurEnum.chauffe_eau;
	energie_generateur: Exclude<
		Ecs.Generateur.EnergieEcs,
		| typeof Ecs.Generateur.EnergieEcsEnum.electricite
		| typeof Ecs.Generateur.EnergieEcsEnum.reseau_chaleur
	>;
	rpn: number;
	qp0: number;
	pveilleuse: number;
	becs: number;
	qgw: number;
};
export function isChaudiereCombustion(
	props: Systeme,
): props is ChaudiereCombustion {
	if (!("type_generateur" in props) || !("energie_generateur" in props)) {
		return false;
	}
	const scopes: Ecs.Generateur.TypeGenerateur[] = [
		Ecs.Generateur.TypeGenerateurEnum.chaudiere,
		Ecs.Generateur.TypeGenerateurEnum.poele_bouilleur,
		Ecs.Generateur.TypeGenerateurEnum.chauffe_eau,
	];
	if (!scopes.includes(props.type_generateur)) {
		return false;
	}
	if (isChauffeEauGaz(props)) {
		return false;
	}
	return props.energie_generateur !== Ecs.Generateur.EnergieEcsEnum.electricite;
}

/**
 * @param props.bouclage_reseau : Bouclage du réseau de distribution d'eau chaude sanitaire saisi
 * @returns Bouclage du réseau de distribution d'eau chaude sanitaire retenu
 */
export function set_bouclage_reseau(props: {
	bouclage_reseau: Ecs.Systeme.Bouclage | null;
}): Ecs.Systeme.Bouclage {
	const { bouclage_reseau } = props;
	return bouclage_reseau ?? Ecs.Systeme.BouclageEnum.non_boucle;
}

/**
 * @param props.isolation_reseau : Isolation du réseau de distribution d'eau chaude sanitaire saisie
 * @returns Isolation du réseau de distribution d'eau chaude sanitaire retenue
 */
export function set_isolation_reseau(props: {
	isolation_reseau: boolean | null;
}): boolean {
	const { isolation_reseau } = props;
	return isolation_reseau ?? false;
}
