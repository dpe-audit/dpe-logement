import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Ecs } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { evaluate } from "#utils/evaluate.js";
import * as climat from "#rules/climat/functions.js";
import * as systeme from "#rules/ecs/systeme/functions.js";
import * as generateur_chauffage from "#rules/chauffage/generateur/functions.js";

/**
 * @param props.rdim : {@linkcode systeme.calcule_rdim}
 * @returns Ratio de dimensionnement du générateur d'eau chaude sanitaire
 */
export function calcule_rdim(props: { rdim: number[] }): number {
	const { rdim } = props;
	return rdim.reduce((acc, r) => acc + r, 0);
}

/**
 * @param props.pn_saisi : Puissance nominale saisie du générateur d'eau chaude sanitaire en kW
 * @param props.pdim : {@linkcode calcule_pdim}
 * @returns Puissance nominale conventionnelle du générateur d'eau chaude sanitaire en kW
 */
export function calcule_pn(props: {
	pn_saisi: number | null;
	pdim: number;
}): number {
	const { pn_saisi, pdim } = props;
	return pn_saisi ?? pdim;
}

/**
 * @param props.pecs : {@linkcode calcule_pecs}
 * @param props.pch : {@linkcode generateur_chauffage.calcule_pch}
 * @returns Puissance de dimensionnement du générateur en kW
 */
export function calcule_pdim(props: {
	pecs: number;
	pch: number | null;
}): number {
	const { pecs, pch } = props;
	return pch ? Math.max(pecs, pch) : pecs;
}

/**
 * @param props.pn_saisi : Puissance nominale saisie du générateur d'eau chaude sanitaire en kW
 * @param props.volume_stockage : {@link set_volume_stockage}
 * @returns Puissance de dimensionnement du besoin d'eau chaude sanitaire en kW
 */
export function calcule_pecs(props: {
	pn_saisi: number | null;
	volume_stockage: number;
}): number {
	const { pn_saisi, volume_stockage } = props;
	if (pn_saisi) return pn_saisi;
	switch (true) {
		case volume_stockage === 0:
			return 21;
		case volume_stockage <= 20:
			return 21 - 0.8 * volume_stockage;
		case volume_stockage <= 150:
			return 5 - 1.751 * ((volume_stockage - 20) / 65);
		default:
			return (7.14 * volume_stockage + 428) / 1000;
	}
}

/**
 * @param props.cop_saisi : Coefficient de performance énergétique saisi
 * @param props.zone_climatique : {@linkcode climat.calcule_zone_climatique}
 * @param props.type_generateur : Type de générateur d'eau chaude sanitaire
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @see abaques.ecs.cop
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de performance énergétique du générateur d'eau chaude sanitaire
 */
export function calcule_cop(props: {
	cop_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_ambiant
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_extrait
		| typeof Ecs.Generateur.TypeGenerateurEnum.pac_double_service
		| typeof Ecs.Generateur.TypeGenerateurEnum.cet_air_exterieur;
	annee_installation: number;
}): number {
	const { cop_saisi, ...query } = props;
	if (cop_saisi) return cop_saisi;

	const abaque = abaques.ecs.cop;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.cop;
}

export type Combustion = {
	// Rendement à pleine charge
	rpn: number;
	// Pertes à l'arrêt en W
	qp0: number;
	// Puissance de la veilleuse en W
	pveilleuse: number;
};

/**
 * @param props.rpn_saisi : Rendement à pleine charge saisi
 * @param props.qp0_saisi : Pertes à l'arrêt en W saisies
 * @param props.pveilleuse_saisi : Puissance de la veilleuse en W saisie
 * @param props.type_generateur : Type de générateur d'eau chaude sanitaire
 * @param props.energie_generateur : {@linkcode set_energie_generateur}
 * @param props.mode_combustion : {@linkcode set_mode_combustion}
 * @param props.volume_stockage : Volume de stockage du générateur d'eau chaude sanitaire en litres
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @param props.pn : Puissance nominale du générateur d'eau chaude sanitaire en kW
 * @param props.presence_ventouse : Présence d'une ventouse sur le générateur d'eau chaude sanitaire
 * @see abaques.ecs.combustion
 * @throws {ValeurForfaitaireError}
 * @return Performances du générateur d'eau chaude sanitaire à combustion
 */
export function calcule_combustion(props: {
	rpn_saisi: number | null;
	qp0_saisi: number | null;
	pveilleuse_saisi: number | null;
	type_generateur:
		| typeof Ecs.Generateur.TypeGenerateurEnum.chaudiere
		| typeof Ecs.Generateur.TypeGenerateurEnum.chauffe_eau
		| typeof Ecs.Generateur.TypeGenerateurEnum.poele_bouilleur;
	energie_generateur:
		| typeof Ecs.Generateur.EnergieEcsEnum.gaz_naturel
		| typeof Ecs.Generateur.EnergieEcsEnum.gpl
		| typeof Ecs.Generateur.EnergieEcsEnum.fioul
		| typeof Ecs.Generateur.EnergieEcsEnum.charbon
		| typeof Ecs.Generateur.EnergieEcsEnum.bois_buche
		| typeof Ecs.Generateur.EnergieEcsEnum.bois_plaquette
		| typeof Ecs.Generateur.EnergieEcsEnum.bois_granule;
	mode_combustion: Ecs.Generateur.ModeCombustion;
	volume_stockage: number;
	annee_installation: number;
	pn: number;
	presence_ventouse: boolean;
}): Combustion {
	const {
		rpn_saisi,
		qp0_saisi,
		pveilleuse_saisi,
		presence_ventouse,
		...query
	} = props;

	const combustion: Partial<Combustion> = {};

	if (rpn_saisi) combustion.rpn = rpn_saisi;
	if (qp0_saisi) combustion.qp0 = qp0_saisi;
	if (pveilleuse_saisi) combustion.pveilleuse = pveilleuse_saisi;

	if (combustion.rpn && combustion.qp0 && combustion.pveilleuse) {
		return combustion as Combustion;
	}

	const abaque = abaques.ecs.combustion;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);

	const E = presence_ventouse ? 1.75 : 2.5;
	const F = presence_ventouse ? -0.55 : -0.8;
	const Pn = match.pn_max ? Math.min(match.pn_max, query.pn) : query.pn;
	const logPn = Math.log10(Pn);
	const scope = { E, F, Pn, logPn };

	combustion.rpn = combustion.rpn ?? evaluate(match.rpn, scope);
	combustion.qp0 = combustion.qp0 ?? evaluate(match.qp0, scope);
	combustion.pveilleuse = combustion.pveilleuse ?? match.pveilleuse;

	return combustion as Combustion;
}

/**
 * @param props.position_chauffe_eau : Position du chauffe-eau
 * @param props.label_generateur : Label du générateur d'eau chaude sanitaire
 * @param props.volume_stockage : {@linkcode set_volume_stockage}
 * @see abaques.ecs.cr
 * @throws {ValeurForfaitaireError}
 * @return Coefficient de perte du ballon de stockage en Wh/l.°C.jour
 */
export function calcule_cr(props: {
	position_chauffe_eau: Ecs.Generateur.PositionChauffeEau;
	label_generateur: Ecs.Generateur.Label | null;
	volume_stockage: number;
}): number {
	const abaque = abaques.ecs.cr;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.cr;
}

export type BallonElectrique = {
	/**
	 * {@linkcode set_energie_generateur}
	 */
	energie: typeof Ecs.Generateur.EnergieEcsEnum.electricite;
	/**
	 * {@linkcode set_volume_stockage}
	 */
	volume_stockage: number;
	/**
	 * {@linkcode calcule_cr}
	 */
	cr: number;
};

export type BallonAccumulation = {
	/**
	 * {@linkcode set_energie_generateur}
	 */
	energie: Exclude<
		Ecs.Generateur.EnergieEcs,
		typeof Ecs.Generateur.EnergieEcsEnum.electricite
	>;
	/**
	 * {@linkcode set_volume_stockage}
	 */
	volume_stockage: number;
};

/**
 * @param props : {@linkcode BallonElectrique} | {@linkcode BallonAccumulation}
 * @return Pertes de stockage en Wh/an
 */
export function calcule_qgw(
	props: BallonElectrique | BallonAccumulation,
): number {
	const { energie, volume_stockage } = props;
	if (energie === Ecs.Generateur.EnergieEcsEnum.electricite) {
		const { cr } = props;
		return 8592 * (45 / 24) * volume_stockage * cr;
	}
	return 67662 * volume_stockage ** 0.55;
}

/**
 * @param props.type_generateur : Type de générateur d'eau chaude sanitaire saisi
 * @return Type de générateur d'eau chaude sanitaire retenu
 */
export function set_type_generateur(props: {
	type_generateur: Ecs.Generateur.TypeGenerateur | null;
}): Ecs.Generateur.TypeGenerateur {
	const { type_generateur } = props;
	return type_generateur ?? Ecs.Generateur.TypeGenerateurEnum.chaudiere;
}

/**
 * @param props.energie_generateur : Energie du générateur d'eau chaude sanitaire saisie
 * @return Energie du générateur d'eau chaude sanitaire retenue
 */
export function set_energie_generateur(props: {
	energie_generateur: Ecs.Generateur.EnergieEcs | null;
}): Ecs.Generateur.EnergieEcs {
	const { energie_generateur } = props;
	return energie_generateur ?? Ecs.Generateur.EnergieEcsEnum.fioul;
}

/**
 * @param props.mode_combustion : Mode de combustion du générateur d'eau chaude sanitaire saisi
 * @return Mode de combustion du générateur d'eau chaude sanitaire retenu
 */
export function set_mode_combustion(props: {
	mode_combustion: Ecs.Generateur.ModeCombustion | null;
}): Ecs.Generateur.ModeCombustion {
	const { mode_combustion } = props;
	return mode_combustion ?? Ecs.Generateur.ModeCombustionEnum.standard;
}

/**
 * @param props.presence_ventouse : Présence d'une ventouse sur le générateur d'eau chaude sanitaire saisie
 * @return Présence d'une ventouse sur le générateur d'eau chaude sanitaire retenue
 */
export function set_presence_ventouse(props: {
	presence_ventouse: boolean | null;
}): boolean {
	const { presence_ventouse } = props;
	return presence_ventouse ?? false;
}

/**
 * @param props.annee_installation : Année d'installation du générateur d'eau chaude sanitaire saisie
 * @param props.annee_construction_batiment : Année de construction du bâtiment
 * @return Année d'installation du générateur d'eau chaude sanitaire retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}

/**
 * @param props.volume_stockage : Volume de stockage d'eau chaude sanitaire en litres saisi
 * @returns Volume de stockage d'eau chaude sanitaire en litres retenu
 */
export function set_volume_stockage(props: {
	volume_stockage: number | null;
}): number {
	const { volume_stockage } = props;
	return volume_stockage ?? 50;
}
