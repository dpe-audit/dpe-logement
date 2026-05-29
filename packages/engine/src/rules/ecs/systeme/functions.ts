import { abaques } from "@open-dpe-logement/abaques";
import { Common, Ecs } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EcsRule from "#rules/ecs/functions.js";
import * as GenerateurRule from "#rules/ecs/generateur/functions.js";
import * as InstallationRule from "#rules/ecs/installation/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { reduceParMois } from "#utils/helpers.js";

/**
 * @param props.becs : {@linkcode InstallationRule.calcule_becs}
 * @param props.fecs : {@linkcode InstallationRule.calcule_fecs}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @param props.iecs : {@linkcode calcule_iecs}
 * @returns Consommation d'énergie du système d'eau chaude sanitaire en kWh/mois
 */
export function calcule_cecs(props: {
	becs: Common.ParMois<number>;
	fecs: number;
	rdim: number;
	iecs: number;
}): number {
	const { fecs, rdim, iecs } = props;
	const becs = reduceParMois(props.becs);
	return becs * (1 - fecs) * iecs * rdim;
}

/**
 * @param props.qcirb : {@linkcode calcule_qcirb}
 * @param props.qtrac : {@linkcode calcule_qtrac}
 * @return Consommation des auxiliaires de distribution d'eau chaude sanitaire en kWh/an
 */
export function calcule_caux_dist(props: {
	qcirb: number;
	qtrac: number;
}): number {
	return (props.qcirb + props.qtrac) / 1000;
}

/**
 * @param props.nj : {@linkcode ClimatRule.calcule_nj}
 * @param props.sh : Surface de l'installation d'eau chaude sanitaire en m²
 * @param props.installation_collective : Installation collective d'eau chaude sanitaire
 * @param props.qdw : {@linkcode InstallationRule.calcule_qdw}
 * @param props.bouclage : {@linkcode set_bouclage_reseau}
 * @param props.niveaux_desservis : Nombre de niveaux desservis par l'installation d'eau chaude sanitaire
 * @return Consommations du circulateur d'eau chaude sanitaire en Wh/an
 */
export function calcule_qcirb(props: {
	nj: Common.ParMois<number>;
	sh: number;
	installation_collective: boolean;
	qdw: number;
	bouclage: Ecs.Systeme.Bouclage;
	niveaux_desservis: number;
}): number {
	const { installation_collective, bouclage } = props;
	if (false === installation_collective) return 0;
	if (bouclage !== Ecs.Systeme.BouclageEnum.boucle) return 0;

	const { sh, qdw, niveaux_desservis } = props;
	const nj = reduceParMois(props.nj);
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
 * @param props.becs : {@linkcode EcsRule.calcule_becs}
 * @param props.installation_collective : Installation collective d'eau chaude sanitaire
 * @param props.bouclage : {@linkcode set_bouclage_reseau}
 * @return Consommation du traçueur d'eau chaude sanitaire en Wh/an
 */
export function calcule_qtrac(props: {
	becs: number;
	installation_collective: boolean;
	bouclage: Ecs.Systeme.Bouclage;
}): number {
	const { installation_collective, bouclage } = props;
	if (false === installation_collective) return 0;
	if (bouclage !== Ecs.Systeme.BouclageEnum.trace) return 0;
	const becs = props.becs * 1000;
	return becs * 0.14;
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

export type Rgs = {
	rg: number;
	rs: number;
	rgs: number;
};

export type RgsProps =
	| RgsChaudiereCombustionProps
	| RgsPoeleBoisBouilleurProps
	| RgsChauffeEauGazProps
	| RgsChaudiereElectriqueProps
	| RgsChauffeEauElectriqueProps
	| RgsChauffeEauThermodynamiqueProps
	| RgsPACDoubleServiceProps
	| RgsPACHybrideProps
	| RgsReseauChaleurProps;

export type RgsCombustionProps<T> = T & {
	/** {@linkcode InstallationRule.calcule_becs} */
	becs: Common.ParMois<number>;
	/** {@linkcode GenerateurRule.calcule_qgw} */
	qgw: number;
	/** {@linkcode GenerateurRule.calcule_combustion} */
	rpn: number;
	/** {@linkcode GenerateurRule.calcule_combustion} */
	qp0: number;
	/** {@linkcode GenerateurRule.calcule_combustion} */
	pveilleuse: number;
};

export type RgsChaudiereCombustionProps = RgsCombustionProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.ChaudiereCombustion["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.ChaudiereCombustion["energie"];
	/** {@linkcode set_isolation_reseau} */
	isolation_reseau: boolean;
	// Générateur multi-bâtiment
	generateur_multi_batiment: boolean;
}>;

export type RgsPoeleBoisBouilleurProps = RgsCombustionProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.PoeleBoisBouilleur["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.PoeleBoisBouilleur["energie"];
}>;

export type RgsChauffeEauGazProps = RgsCombustionProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.ChauffeEauGaz["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.ChauffeEauGaz["energie"];
}>;

export type RgsGenerateurElectriqueProps<T> = T & {
	/** {@linkcode InstallationRule.calcule_becs} */
	becs: Common.ParMois<number>;
	/** {@linkcode GenerateurRule.calcule_qgw} */
	qgw: number;
	/** {@linkcode calcule_rd} */
	rd: number;
	// Position du chauffe-eau électrique
	position_chauffe_eau: Ecs.Generateur.PositionChauffeEau | null;
	// Label du chauffe-eau électrique
	label_generateur: Ecs.Generateur.Label | null;
};
export type RgsChaudiereElectriqueProps = RgsGenerateurElectriqueProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.ChaudiereElectrique["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.ChaudiereElectrique["energie"];
	/** {@linkcode set_isolation_reseau} */
	isolation_reseau: boolean;
	// Générateur multi-bâtiment
	generateur_multi_batiment: boolean;
}>;

export type RgsChauffeEauElectriqueProps = RgsGenerateurElectriqueProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.ChauffeEauElectrique["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.ChauffeEauElectrique["energie"];
}>;

export type RgsGenerateurThermodynamiqueProps<T> = {
	/** {@linkcode GenerateurRule.calcule_cop} */
	cop: number;
} & T;

export type RgsChauffeEauThermodynamiqueProps =
	RgsGenerateurThermodynamiqueProps<{
		/** {@linkcode GenerateurRule.set_type_generateur} */
		type_generateur: Ecs.Generateur.ChauffeEauThermodynamique["type"];
		/** {@linkcode GenerateurRule.set_energie_generateur} */
		energie_generateur: Ecs.Generateur.ChauffeEauThermodynamique["energie"];
	}>;

export type RgsPACDoubleServiceProps = RgsGenerateurThermodynamiqueProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.PacDoubleService["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.PacDoubleService["energie"];
	// Energie secondaire
	bienergie: null;
	/** {@linkcode set_isolation_reseau} */
	isolation_reseau: boolean;
	// Générateur multi-bâtiment
	generateur_multi_batiment: boolean;
}>;

export type RgsPACHybrideProps = RgsCombustionProps<{
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.PacHybride["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.PacHybride["energie"];
	// Energie secondaire
	bienergie: Ecs.Generateur.PacHybride["bienergie"];
	/** {@linkcode set_isolation_reseau} */
	isolation_reseau: boolean;
	// Générateur multi-bâtiment
	generateur_multi_batiment: boolean;
}>;

export type RgsReseauChaleurProps = {
	/** {@linkcode GenerateurRule.set_type_generateur} */
	type_generateur: Ecs.Generateur.ReseauChaleur["type"];
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Ecs.Generateur.ReseauChaleur["energie"];
	/** {@linkcode set_isolation_reseau} */
	isolation_reseau: boolean;
};

export function calcule_rgs(props: RgsChaudiereCombustionProps): Rgs;
export function calcule_rgs(props: RgsPoeleBoisBouilleurProps): Rgs;
export function calcule_rgs(props: RgsChauffeEauGazProps): Rgs;
export function calcule_rgs(props: RgsChaudiereElectriqueProps): Rgs;
export function calcule_rgs(props: RgsChauffeEauElectriqueProps): Rgs;
export function calcule_rgs(props: RgsChauffeEauThermodynamiqueProps): Rgs;
export function calcule_rgs(props: RgsPACDoubleServiceProps): Rgs;
export function calcule_rgs(props: RgsPACHybrideProps): Rgs;
export function calcule_rgs(props: RgsReseauChaleurProps): Rgs;
export function calcule_rgs(props: RgsProps): Rgs {
	const { type_generateur, energie_generateur } = props;

	const build = (props: Partial<Rgs>): Rgs => ({
		rg: props.rg ?? 1,
		rs: props.rs ?? 1,
		rgs: props.rgs ?? 1,
	});

	if ("generateur_multi_batiment" in props && props.generateur_multi_batiment)
		return build({ rgs: calcule_rgs_reseau_chaleur(props) });

	switch (type_generateur) {
		case Ecs.Generateur.TypeGenerateurEnum.chaudiere: {
			if (energie_generateur === Ecs.Generateur.EnergieEcsEnum.electricite) {
				const rs = calcule_rs(props);
				const rg = calcule_rg_systeme_electrique(props);
				return build({ rg, rs });
			}
			return build({ rgs: calcule_rgs_chaudiere_mixte(props) });
		}
		case Ecs.Generateur.TypeGenerateurEnum.poele_bouilleur: {
			return build({ rgs: calcule_rgs_chaudiere_mixte(props) });
		}
		case Ecs.Generateur.TypeGenerateurEnum.chauffe_eau: {
			if (energie_generateur === Ecs.Generateur.EnergieEcsEnum.electricite) {
				const rs = calcule_rs(props);
				const rg = calcule_rg_systeme_electrique(props);
				return build({ rg, rs });
			}
			return props.qgw
				? build({ rgs: calcule_rgs_accumulateur_gaz(props) })
				: build({ rg: calcule_rg_chauffe_eau_gaz(props) });
		}
		case Ecs.Generateur.TypeGenerateurEnum.cet_air_ambiant:
		case Ecs.Generateur.TypeGenerateurEnum.cet_air_exterieur:
		case Ecs.Generateur.TypeGenerateurEnum.cet_air_extrait: {
			return build({ rgs: props.cop });
		}
		case Ecs.Generateur.TypeGenerateurEnum.pac_double_service: {
			return props.bienergie
				? build({ rgs: calcule_rgs_chaudiere_mixte(props) })
				: build({ rgs: props.cop });
		}
		case Ecs.Generateur.TypeGenerateurEnum.reseau_chaleur: {
			return build({ rgs: calcule_rgs_reseau_chaleur(props) });
		}
	}
}

/**
 * @param props.becs : {@linkcode InstallationRule.calcule_becs}
 * @param props.qgw : {@linkcode GenerateurRule.calcule_qgw}
 * @param props.rpn : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.qp0 : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.pveilleuse : {@linkcode GenerateurRule.calcule_combustion}
 * @returns Rendement de génération et de stockage de la chaudière mixte
 */
export function calcule_rgs_chaudiere_mixte(
	props: RgsCombustionProps<object>,
): number {
	const { qgw, rpn, pveilleuse } = props;
	const qp0 = props.qp0 * 1000;
	const becs = reduceParMois(props.becs) * 1000;
	return (
		1 /
		(1 / rpn + (1790 * qp0 + qgw) / becs + 6970 * ((0.5 * pveilleuse) / becs))
	);
}

/**
 * @param props {@linkcode RgsChauffeEauGazProps}
 * @returns Rendement de génération et de stockage de l'accumulateur gaz
 */
export function calcule_rgs_accumulateur_gaz(
	props: RgsChauffeEauGazProps,
): number {
	const { qgw, rpn, pveilleuse } = props;
	const qp0 = props.qp0 * 1000;
	const becs = reduceParMois(props.becs) * 1000;
	return 1 / (1 / rpn + (8592 * qp0 + qgw) / becs + 6970 * (pveilleuse / becs));
}

/**
 * @param props.isolation_reseau : {@linkcode set_isolation_reseau}
 * @return Rendement de génération et de stockage du réseau de chaleur et des générateurs multi-bâtiment
 */
export function calcule_rgs_reseau_chaleur(props: {
	isolation_reseau: boolean;
}): number {
	return props.isolation_reseau ? 0.9 : 0.75;
}

/**
 * @param props.becs : {@linkcode InstallationRule.calcule_becs}
 * @param props.rpn : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.qp0 : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.pveilleuse : {@linkcode GenerateurRule.calcule_combustion}
 * @returns Rendement de génération du chauffe-eau gaz
 */
export function calcule_rg_chauffe_eau_gaz(props: {
	becs: Common.ParMois<number>;
	rpn: number;
	qp0: number;
	pveilleuse: number;
}): number {
	const { rpn, pveilleuse } = props;
	const qp0 = props.qp0 * 1000;
	const becs = reduceParMois(props.becs) * 1000;
	let rg: number = 1 / rpn;
	rg += 1790 * (qp0 / becs);
	rg += 6970 * (pveilleuse / becs);
	return 1 / rg;
}

/**
 * @param props.type_generateur : {@linkcode GenerateurRule.set_type_generateur}
 * @return Rendement de génération du système électrique
 */
export function calcule_rg_systeme_electrique(props: {
	type_generateur: Ecs.Generateur.GenerateurElectrique["type"];
	energie_generateur: Ecs.Generateur.GenerateurElectrique["energie"];
}): number {
	const { type_generateur } = props;
	return type_generateur === Ecs.Generateur.TypeGenerateurEnum.chaudiere
		? 0.97
		: 1;
}

/**
 * @param props.position_chauffe_eau : Position du chauffe-eau
 * @param props.label_generateur : Label du générateur d'eau chaude sanitaire
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @return Rendement de stockage du système d'eau chaude sanitaire
 */
export function calcule_rs(
	props: GenerateurRule.GenerateurElectriqueProps<{
		position_chauffe_eau: Ecs.Generateur.PositionChauffeEau | null;
		label_generateur: Ecs.Generateur.Label | null;
		rd: number;
		becs: Common.ParMois<number>;
		qgw: number;
	}>,
): number {
	const { position_chauffe_eau, label_generateur, rd, qgw } = props;
	const becs = reduceParMois(props.becs) * 1000;

	return position_chauffe_eau ===
		Ecs.Generateur.PositionChauffeEauEnum.chauffe_eau_vertical &&
		label_generateur === Ecs.Generateur.LabelEnum.ne_performance_c
		? 1.08 / (1 + (qgw * rd) / becs)
		: 1 / (1 + (qgw * rd) / becs);
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
