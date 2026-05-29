import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Chauffage, Common } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as ChauffageRule from "#rules/chauffage/functions.js";
import * as EmetteurRule from "#rules/chauffage/emetteur/functions.js";
import * as InstallationRule from "#rules/chauffage/installation/functions.js";
import * as SystemeRule from "#rules/chauffage/systeme/functions.js";
import * as GenerateurEcsRule from "#rules/ecs/generateur/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import {
	createParMois,
	reduceParMois,
	type NonEmptyArray,
} from "#utils/helpers.js";
import { evaluate } from "#utils/math.js";

/**
 * @param props.bch : {@linkcode ChauffageRule.calcule_bch}
 * @param props.pn : {@linkcode calcule_pn}
 * @param props.paux : {@linkcode calcule_paux}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @return Consommations de l'auxiliaire de génération de chauffage en kWh/an
 */
export function calcule_caux(props: {
	bch: Common.ParMois<number>;
	pn: number;
	paux: number;
	rdim: number;
}): number {
	const { pn, paux, rdim } = props;
	const bch = reduceParMois(props.bch);
	return (paux * bch * rdim) / pn;
}

/**
 * @param props.systemes - Systèmes associés au générateur de chauffage
 * @param props.systemes[].rdim - {@linkcode SystemeRule.calcule_rdim}
 * @param props.systemes[].rdim_installation - {@linkcode InstallationRule.calcule_rdim}
 * @returns Ratio de dimensionnement du générateur de chauffage
 */
export function calcule_rdim(props: {
	systemes: { rdim: number; rdim_installation: number }[];
}): number {
	const { systemes } = props;
	return systemes.reduce((acc, s) => acc + s.rdim * s.rdim_installation, 0);
}

/**
 * @param props.energie_generateur : {@linkcode set_energie_generateur} | bienergie du générateur de chauffage
 * @return Facteur de conversion PCI/PCS
 */
export function calcule_kpcs(props: {
	energie_generateur: Chauffage.Generateur.EnergieChauffage;
}): number {
	const { energie_generateur } = props;
	switch (energie_generateur) {
		case Chauffage.Generateur.EnergieChauffageEnum.electricite:
		case Chauffage.Generateur.EnergieChauffageEnum.reseau_chaleur:
			return 1;
		case Chauffage.Generateur.EnergieChauffageEnum.gaz_naturel:
			return 1.11;
		case Chauffage.Generateur.EnergieChauffageEnum.gpl:
			return 1.09;
		case Chauffage.Generateur.EnergieChauffageEnum.fioul:
			return 1.07;
		case Chauffage.Generateur.EnergieChauffageEnum.charbon:
			return 1.04;
		case Chauffage.Generateur.EnergieChauffageEnum.bois_buche:
		case Chauffage.Generateur.EnergieChauffageEnum.bois_plaquette:
		case Chauffage.Generateur.EnergieChauffageEnum.bois_granule:
			return 1.08;
	}
}

/**
 * @param props.pn_saisi : Puissance nominale saisie du générateur de chauffage en kW
 * @param props.pdim : {@linkcode calcule_pdim}
 * @returns Puissance nominale conventionnelle du générateur de chauffage en kW
 */
export function calcule_pn(props: {
	pn_saisi: number | null;
	pdim: number;
}): number {
	const { pn_saisi, pdim } = props;
	return pn_saisi ?? pdim;
}

/**
 * @param props.pch : {@linkcode calcule_pch}
 * @param props.pecs : {@linkcode GenerateurEcsRule.calcule_pecs}
 * @returns Puissance de dimensionnement du générateur en kW
 */
export function calcule_pdim(props: {
	pch: number;
	pecs: number | null;
}): number {
	const { pch, pecs } = props;
	return pecs ? Math.max(pch, pecs) : pch;
}

/**
 * @param props.pn_saisi: Puissance nominale saisie du générateur de chauffage en kW
 * @param props.pch_systemes: {@linkcode SystemeRule.calcule_pch_coll} {@linkcode SystemeRule.calcule_pch}
 * @return Puissance de chauffage du générateur de chauffage en kW
 */
export function calcule_pch(props: {
	pn_saisi: number | null;
	pch_systemes: number[];
}): number {
	const { pn_saisi, pch_systemes } = props;
	return pn_saisi ?? pch_systemes.reduce((acc, p) => acc + p, 0);
}

/**
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.energie_generateur : {@linkcode set_energie_generateur}
 * @param props.generateur_multi_batiment : Générateur multi-bâtiment
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @param props.pn : {@linkcode calcule_pn}
 * @see abaques.chauffage.paux
 * @throws {ValeurForfaitaireError}
 * @return Puissance de l'auxiliaire de génération de chauffage en kW
 */
export function calcule_paux(props: {
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	energie_generateur: Chauffage.Generateur.EnergieChauffage;
	generateur_multi_batiment: boolean;
	presence_ventouse: boolean | null;
	pn: number;
}): number {
	const { pn, generateur_multi_batiment, ...query } = props;
	if (generateur_multi_batiment) return 0;
	const abaque = abaques.chauffage.paux;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	const G = match.G;
	const H = match.H;
	const Pn = match.pn_max ? Math.min(match.pn_max, pn) : pn;
	const scope = { G, H, Pn };
	return evaluate(match.paux, scope);
}

export type Combustion = {
	// Rendement à charge intermédiaire
	rpint: number;
	// Rendement à pleine charge
	rpn: number;
	// Pertes à l'arrêt en kW
	qp0: number;
	// Puissance de la veilleuse en W
	pveilleuse: number;
};

/**
 * @param props.rpint_saisi : Rendement à charge intermédiaire saisi
 * @param props.rpn_saisi : Rendement à pleine charge saisi
 * @param props.qp0_saisi : Pertes à l'arrêt en kW saisies
 * @param props.pveilleuse_saisi : Puissance de la veilleuse en W saisie
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.energie_generateur : {@linkcode set_energie_generateur} | bienergie du générateur de chauffage
 * @param props.mode_combustion : {@linkcode set_mode_combustion}
 * @param props.annee_installation : {@linkcode set_annee_installation}
 * @param props.pn : {@linkcode calcule_pn}
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @see abaques.chauffage.combustion
 * @throws {ValeurForfaitaireError}
 * @return Performances du générateur de chauffage à combustion
 */
export function calcule_combustion(props: {
	rpint_saisi: number | null;
	rpn_saisi: number | null;
	qp0_saisi: number | null;
	pveilleuse_saisi: number | null;
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurEnum.chaudiere
		| typeof Chauffage.Generateur.TypeGenerateurEnum.generateur_air_chaud
		| typeof Chauffage.Generateur.TypeGenerateurEnum.radiateur_gaz
		| typeof Chauffage.Generateur.TypeGenerateurEnum.poele_bouilleur
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_air_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_eau_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_eau_glycolee_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_geothermique;
	energie_generateur: Exclude<
		Chauffage.Generateur.EnergieChauffage,
		| typeof Chauffage.Generateur.EnergieChauffageEnum.electricite
		| typeof Chauffage.Generateur.EnergieChauffageEnum.reseau_chaleur
	>;
	mode_combustion: Chauffage.Generateur.ModeCombustion;
	annee_installation: number;
	pn: number;
	presence_ventouse: boolean;
}): Combustion {
	const {
		rpint_saisi,
		rpn_saisi,
		qp0_saisi,
		pveilleuse_saisi,
		presence_ventouse,
		...query
	} = props;

	const combustion: Partial<Combustion> = {};

	if (rpint_saisi) combustion.rpint = rpint_saisi;
	if (rpn_saisi) combustion.rpn = rpn_saisi;
	if (qp0_saisi) combustion.qp0 = qp0_saisi;
	if (pveilleuse_saisi) combustion.pveilleuse = pveilleuse_saisi;

	if (Object.keys(combustion).length === 4) {
		return combustion as Combustion;
	}

	const abaque = abaques.chauffage.combustion;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);

	const E = presence_ventouse ? 1.75 : 2.5;
	const F = presence_ventouse ? -0.55 : -0.8;
	const Pn = match.pn_max ? Math.min(match.pn_max, query.pn) : query.pn;
	const logPn = Math.log10(Pn);
	const scope = { E, F, Pn, logPn };

	combustion.rpint = combustion.rpint ?? evaluate(match.rpint, scope);
	combustion.rpn = combustion.rpn ?? evaluate(match.rpn, scope);
	combustion.qp0 = combustion.qp0 ?? evaluate(match.qp0, scope);
	combustion.pveilleuse = combustion.pveilleuse ?? match.pveilleuse;

	return combustion as Combustion;
}

/**
 * {@linkcode QPxChaudiere} | {@linkcode QPxGenerateurAir} | {@linkcode QPxChaudiereBois} | {@linkcode QPxRadiateurGaz}
 */
export type QPx =
	| QPxChaudiere
	| QPxGenerateurAir
	| QPxChaudiereBois
	| QPxRadiateurGaz;

/**
 * {@linkcode QPxChaudiereProps} | {@linkcode QPxGenerateurAirProps} | {@linkcode QPxChaudiereBoisProps} | {@linkcode QPxRadiateurGazProps}
 */
export type QPxProps =
	| QPxChaudiereProps
	| QPxGenerateurAirProps
	| QPxChaudiereBoisProps
	| QPxRadiateurGazProps;

export type QPxChaudiere = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_standard
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_basse_temperature
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_condensation;
	// Pertes à 30% de charge en W
	qp30: number;
	// Pertes à 100% de charge en W
	qp100: number;
};

export type QPxChaudiereProps = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_standard
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_basse_temperature
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_condensation;
	/** {@linkcode set_presence_regulation} */
	presence_regulation: boolean;
	/** {@linkcode calcule_pn} */
	pn: number;
	/** {@linkcode calcule_combustion} */
	rpn: number;
	/** {@linkcode calcule_combustion} */
	rpint: number;
	/** {@linkcode calcule_tfonc30} */
	tfonc30: number;
	/** {@linkcode calcule_tfonc100} */
	tfonc100: number;
	/** {@linkcode calcule_kpcs} */
	kpcs: number;
};

export type QPxGenerateurAir = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.generateur_air_chaud;
	// Pertes à 50% de charge en W
	qp50: number;
	// Pertes à 100% de charge en W
	qp100: number;
};
export type QPxGenerateurAirProps = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.generateur_air_chaud;
	/** {@linkcode calcule_pn} */
	pn: number;
	/** {@linkcode calcule_combustion} */
	rpn: number;
	/** {@linkcode calcule_combustion} */
	rpint: number;
	/** {@linkcode calcule_kpcs} */
	kpcs: number;
};

export type QPxChaudiereBois = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_bois;
	// Pertes à 50% de charge en W
	qp50: number;
	// Pertes à 100% de charge en W
	qp100: number;
};
export type QPxChaudiereBoisProps = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_bois;
	/** {@linkcode calcule_pn} */
	pn: number;
	/** {@linkcode calcule_combustion} */
	rpn: number;
	/** {@linkcode calcule_combustion} */
	rpint: number;
	/** {@linkcode calcule_kpcs} */
	kpcs: number;
};

export type QPxRadiateurGaz = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.radiateur_gaz;
};
export type QPxRadiateurGazProps = {
	/** {@linkcode set_type_generateur_combustion} */
	type_generateur: typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.radiateur_gaz;
};

export function calcule_qpx(props: QPxChaudiereProps): QPxChaudiere;
export function calcule_qpx(props: QPxGenerateurAirProps): QPxGenerateurAir;
export function calcule_qpx(props: QPxChaudiereBoisProps): QPxChaudiereBois;
export function calcule_qpx(props: QPxRadiateurGazProps): QPxRadiateurGaz;
export function calcule_qpx(props: QPxProps): QPx {
	const { type_generateur } = props;
	const enums = Chauffage.Generateur.TypeGenerateurCombustionEnum;

	switch (type_generateur) {
		case enums.chaudiere_standard: {
			const { pn, tfonc30, tfonc100, presence_regulation, kpcs } = props;
			const rpint = (props.rpint * 100) / kpcs;
			const rpn = (props.rpn * 100) / kpcs;
			const qp30 = presence_regulation
				? 0.3 *
					pn *
					((100 - (rpint + 0.1 * (50 - tfonc30))) /
						(rpint + 0.1 * (50 - tfonc30)))
				: 0.3 *
					pn *
					((100 - (rpint + 0.1 * (50 - tfonc100))) /
						(rpint + 0.1 * (50 - tfonc100)));
			const qp100 =
				pn *
				((100 - (rpn + 0.1 * (70 - tfonc100))) / (rpn + 0.1 * (70 - tfonc100)));

			return { type_generateur, qp30, qp100 };
		}
		case enums.chaudiere_basse_temperature:
		case enums.chaudiere_condensation: {
			const { pn, tfonc30, tfonc100, presence_regulation, kpcs } = props;
			const rpint = (props.rpint * 100) / kpcs;
			const rpn = (props.rpn * 100) / kpcs;
			const qp30 = presence_regulation
				? 0.3 *
					pn *
					((100 - (rpint + 0.2 * (33 - tfonc30))) /
						(rpint + 0.2 * (33 - tfonc30)))
				: 0.3 *
					pn *
					((100 - (rpint + 0.2 * (33 - tfonc100))) /
						(rpint + 0.2 * (33 - tfonc100)));
			const qp100 =
				pn *
				((100 - (rpn + 0.1 * (70 - tfonc100))) / (rpn + 0.1 * (70 - tfonc100)));

			return { type_generateur, qp30, qp100 };
		}
		case enums.generateur_air_chaud:
		case enums.chaudiere_bois: {
			const { pn, kpcs } = props;
			const rpint = (props.rpint * 100) / kpcs;
			const rpn = (props.rpn * 100) / kpcs;
			const qp50 = 0.5 * pn * ((100 - rpint) / rpint);
			const qp100 = pn * ((100 - rpn) / rpn);
			return { type_generateur, qp50, qp100 };
		}
		case enums.radiateur_gaz: {
			return { type_generateur };
		}
	}
}

/**
 * @param props.scop_saisi - Coefficient de performance énergétique saisonnier saisi
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.type_generateur - {@linkcode set_type_generateur}
 * @param props.types_emetteur - Type d'émetteur de chauffage
 * @param props.annee_installation - {@linkcode set_annee_installation}
 * @return Coefficient de performance énergétique saisonnier SCOP
 */
export function calcule_scop(props: {
	scop_saisi: number | null;
	zone_climatique: Batiment.ZoneClimatique;
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_air_air
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_air_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_eau_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_eau_glycolee_eau
		| typeof Chauffage.Generateur.TypeGenerateurEnum.pac_geothermique;
	types_emetteur: Chauffage.Emetteur.TypeEmetteur[];
	annee_installation: number;
}): number {
	const { scop_saisi } = props;
	if (scop_saisi) return scop_saisi;
	const { zone_climatique, type_generateur, annee_installation } = props;
	const types_emetteur = [...new Set(props.types_emetteur)];
	const abaque = abaques.chauffage.scop;

	if (types_emetteur.length === 0) {
		const query = { zone_climatique, type_generateur, annee_installation };
		const match = abaque.search(query, abaque.load()).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.scop;
	}
	const values = types_emetteur.map((type_emetteur) => {
		const query = {
			zone_climatique,
			type_generateur,
			annee_installation,
			type_emetteur,
		};
		const match = abaque.search(query, abaque.load()).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.scop;
	});
	return Math.min(...values);
}

/**
 * @param props.type_generateur : {@linkcode set_type_generateur_combustion}
 * @param props.tfonc30_saisi : Température de fonctionnement à 30% de charge saisie
 * @param props.mode_combustion : {@linkcode set_mode_combustion}
 * @param props.temperatures_distribution : {@linkcode EmetteurRule.set_temperature_distribution}
 * @param props.annee_installation_emetteur : {@linkcode EmetteurRule.set_annee_installation}
 * @param props.annee_installation_generateur : {@linkcode set_annee_installation}
 */
export function calcule_tfonc30(props: {
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_standard
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_basse_temperature
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_condensation;
	tfonc30_saisi: number | null;
	mode_combustion: Chauffage.Generateur.ModeCombustion;
	temperatures_distribution: NonEmptyArray<Chauffage.Emetteur.TemperatureDistribution>;
	annee_installation_emetteur: number;
	annee_installation_generateur: number;
}): number {
	const { tfonc30_saisi } = props;
	if (tfonc30_saisi) return tfonc30_saisi;
	const { annee_installation_emetteur, annee_installation_generateur } = props;
	const temperatures_distribution = [
		...new Set(props.temperatures_distribution),
	];
	const abaque = abaques.chauffage.tfonc30;
	const values = temperatures_distribution.map((temperature_distribution) => {
		const query = {
			temperature_distribution,
			annee_installation_emetteur,
			annee_installation_generateur,
		};
		const match = abaque.search(query, abaque.load()).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.tfonc30;
	});
	return Math.max(...values);
}

/**
 * @param props.type_generateur : {@linkcode set_type_generateur_combustion}
 * @param props.tfonc100_saisi : Température de fonctionnement à 100% de charge saisie
 * @param props.temperatures_distribution : {@linkcode EmetteurRule.set_temperature_distribution}
 * @param props.annee_installation_emetteur : {@linkcode EmetteurRule.set_annee_installation}
 */
export function calcule_tfonc100(props: {
	type_generateur:
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_standard
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_basse_temperature
		| typeof Chauffage.Generateur.TypeGenerateurCombustionEnum.chaudiere_condensation;
	tfonc100_saisi: number | null;
	temperatures_distribution: NonEmptyArray<Chauffage.Emetteur.TemperatureDistribution>;
	annee_installation_emetteur: number;
}): number {
	const { tfonc100_saisi, annee_installation_emetteur } = props;
	if (tfonc100_saisi) return tfonc100_saisi;
	const temperatures_distribution = [
		...new Set(props.temperatures_distribution),
	];
	const abaque = abaques.chauffage.tfonc100;
	const values = temperatures_distribution.map((temperature_distribution) => {
		const query = {
			annee_installation_emetteur,
			temperature_distribution,
		};
		const match = abaque.search(query, abaque.load()).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.tfonc100;
	});
	return Math.max(...values);
}

/**
 * @param props.generateur_mixte : Générateur assurant la production de chauffage et d'eau chaude sanitaire
 * @param props.qgen : {@linkcode calcule_qgen}
 * @param props.nref : {@linkcode ChauffageRule.calcule_nref}
 * @param props.bch_hp : {@linkcode ChauffageRule.calcule_bch_hp}
 * @param props.pn : {@linkcode calcule_pn}
 * @return Pertes de génération récupérables du générateur de chauffage en Wh/mois
 */
export function calcule_qgen_rec(props: {
	generateur_mixte: boolean;
	qgen: number;
	pn: number;
	nref: Common.ParMois<number>;
	bch_hp: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { generateur_mixte, qgen, pn } = props;
	return createParMois((mois) => {
		const nref = props.nref[mois];
		const bch_hp = props.bch_hp[mois];
		const dper = generateur_mixte
			? Math.min(nref, (1.3 * bch_hp) / (0.3 * pn) + nref * (1790 / 8760))
			: Math.min(nref, (1.3 * bch_hp) / (0.3 * pn));
		return qgen * dper;
	});
}

/**
 * @param props.presence_ventouse : {@linkcode set_presence_ventouse}
 * @param props.qp0 : {@linkcode calcule_combustion}
 * @return Pertes de génération du générateur de chauffage en Wh/an
 */
export function calcule_qgen(props: {
	presence_ventouse: boolean | null;
	qp0: number | null;
}): number {
	const qp0 = props.qp0 ? props.qp0 * 1000 : 0;
	const cper = props.presence_ventouse ? 0.75 : 5;
	return 0.48 * cper * qp0;
}

/**
 * @param props.type_generateur : Type de générateur de chauffage saisi
 * @return Type de générateur de chauffage retenu
 */
export function set_type_generateur(props: {
	type_generateur: Chauffage.Generateur.TypeGenerateur | null;
}): Chauffage.Generateur.TypeGenerateur {
	const { type_generateur } = props;
	return type_generateur ?? Chauffage.Generateur.TypeGenerateurEnum.chaudiere;
}

/**
 * @param props.energie_generateur : Energie du générateur de chauffage saisie
 * @return Energie du générateur de chauffage retenue
 */
export function set_energie_generateur(props: {
	energie_generateur: Chauffage.Generateur.EnergieChauffage | null;
}): Chauffage.Generateur.EnergieChauffage {
	const { energie_generateur } = props;
	return energie_generateur ?? Chauffage.Generateur.EnergieChauffageEnum.fioul;
}

/**
 * @param props.mode_combustion : Mode de combustion du générateur de chauffage saisi
 * @return Mode de combustion du générateur de chauffage retenu
 */
export function set_mode_combustion(props: {
	mode_combustion: Chauffage.Generateur.ModeCombustion | null;
}): Chauffage.Generateur.ModeCombustion {
	const { mode_combustion } = props;
	return mode_combustion ?? Chauffage.Generateur.ModeCombustionEnum.standard;
}

/**
 * @param props.presence_ventouse : Présence d'une ventouse sur le générateur de chauffage saisie
 * @return Présence d'une ventouse sur le générateur de chauffage retenue
 */
export function set_presence_ventouse(props: {
	presence_ventouse: boolean | null;
}): boolean {
	const { presence_ventouse } = props;
	return presence_ventouse ?? false;
}

/**
 * @param props.presence_regulation : Présence d'une régulation de combustion sur le générateur de chauffage saisie
 * @return Présence d'une régulation de combustion sur le générateur de chauffage retenue
 */
export function set_presence_regulation(props: {
	presence_regulation: boolean | null;
}): boolean {
	const { presence_regulation } = props;
	return presence_regulation ?? false;
}

/**
 * @param props.annee_installation : Année d'installation du générateur de chauffage saisie
 * @param props.annee_construction_batiment : Année de construction du bâtiment
 * @return Année d'installation du générateur de chauffage retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}

/**
 * @param props.type_generateur : {@linkcode set_type_generateur}
 * @param props.energie_generateur : {@linkcode set_energie_generateur}
 * @param props.bienergie_generateur : Energie secondaire (PAC hybride)
 * @param props.mode_combustion : {@linkcode set_mode_combustion}
 * @return Type de système de chauffage à combustion ou null si le générateur n'est pas à combustion
 */
export function set_type_generateur_combustion(props: {
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	energie_generateur: Chauffage.Generateur.EnergieChauffage;
	bienergie_generateur: Chauffage.Generateur.EnergieChauffage | null;
	mode_combustion: Chauffage.Generateur.ModeCombustion;
}): Chauffage.Generateur.TypeGenerateurCombustion | null {
	const { type_generateur } = props;
	const energie_generateur =
		props.bienergie_generateur ?? props.energie_generateur;

	if (Common.ENERGIES_COMBUSTION.includes(energie_generateur)) return null;

	const type = Chauffage.Generateur.TypeGenerateurCombustionEnum;

	switch (type_generateur) {
		case Chauffage.Generateur.TypeGenerateurEnum.radiateur_gaz:
			return type.radiateur_gaz;
		case Chauffage.Generateur.TypeGenerateurEnum.generateur_air_chaud:
			return type.generateur_air_chaud;
		case Chauffage.Generateur.TypeGenerateurEnum.chaudiere:
		case Chauffage.Generateur.TypeGenerateurEnum.poele_bouilleur:
		case Chauffage.Generateur.TypeGenerateurEnum.pac_air_eau:
		case Chauffage.Generateur.TypeGenerateurEnum.pac_eau_eau:
		case Chauffage.Generateur.TypeGenerateurEnum.pac_eau_glycolee_eau:
		case Chauffage.Generateur.TypeGenerateurEnum.pac_geothermique:
			if (Common.ENERGIES_BOIS.includes(energie_generateur))
				return type.chaudiere_bois;

			switch (props.mode_combustion) {
				case Chauffage.Generateur.ModeCombustionEnum.condensation:
					return type.chaudiere_condensation;
				case Chauffage.Generateur.ModeCombustionEnum.basse_temperature:
					return type.chaudiere_basse_temperature;
				case Chauffage.Generateur.ModeCombustionEnum.standard:
					return type.chaudiere_standard;
			}
		default:
			return null;
	}
}
