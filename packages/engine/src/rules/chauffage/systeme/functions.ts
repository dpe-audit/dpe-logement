import { abaques } from "@open-dpe-logement/abaques";
import {
	Batiment,
	Chauffage,
	Common,
	Enveloppe,
} from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as EnveloppeRule from "#rules/enveloppe/functions.js";
import * as ChauffageRule from "#rules/chauffage/functions.js";
import * as EmetteurRule from "#rules/chauffage/emetteur/functions.js";
import * as InstallationRule from "#rules/chauffage/installation/functions.js";
import * as GenerateurRule from "#rules/chauffage/generateur/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import {
	createParTauxCharge,
	createParMois,
	reduceParMois,
	type NonEmptyArray,
} from "#utils/helpers.js";

/**
 * @param props.bch : {@linkcode calcule_bch}
 * @param props.rdim : {@linkcode calcule_rdim}
 * @param props.int : {@linkcode calcule_int}
 * @param props.ich : {@linkcode calcule_ich} |
 * @return Consommations du système de chauffage en kWh/an
 */
export function calcule_cch(props: {
	bch: Common.ParMois<number>;
	rdim: number;
	int: number;
	ich: number;
}): number {
	const { rdim, int, ich } = props;
	const bch = reduceParMois(props.bch);
	return bch * int * ich * rdim;
}

/**
 * @param props.pcircem : {@linkcode calcule_pcircem}
 * @param props.nref : {@linkcode ChauffageRule.calcule_nref}
 * @return Consommations du circulateur de l'installation de chauffage en kWh/an
 */
export function calcule_caux_dist(props: {
	pcircem: number;
	nref: Common.ParMois<number>;
}): number {
	const { pcircem } = props;
	const nref = reduceParMois(props.nref);
	return (pcircem * nref) / 1000;
}

/**
 * @param props.bch : {@linkcode InstallationRule.calcule_bch}
 * @param props.dht : {@linkcode calcule_dht}
 * @param props.dh14 : {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.installation_collective : Installation collective ou individuelle
 * @param props.generateur_individuel : Générateur individuel ou collectif
 * @param props.systemes : Autres systèmes de chauffage associés à l'installation de chauffage
 * @param props.systemes[].generateur_individuel : Générateur individuel ou collectif
 * @return Besoins de chauffage en kWh/mois
 */
export function calcule_bch(props: {
	bch: Common.ParMois<number>;
	dht: Common.ParMois<number>;
	dh14: Common.ParMois<number>;
	installation_collective: boolean;
	generateur_individuel: boolean;
	systemes: { generateur_individuel: boolean }[];
}): Common.ParMois<number> {
	const { installation_collective, generateur_individuel } = props;
	const systemes = props.systemes.filter(
		(s) => s.generateur_individuel === generateur_individuel,
	);

	// Installation de chauffage collectif avec base + appoint
	if (
		installation_collective &&
		(generateur_individuel || systemes.length > 0)
	) {
		return createParMois((mois) => {
			const dht = props.dht[mois];
			const dh14 = props.dh14[mois];
			const bch = props.bch[mois];
			return generateur_individuel
				? bch * (dht / dh14)
				: bch * (1 - dht / dh14);
		});
	}
	// Autres cas
	return props.bch;
}

/**
 * @param props.configuration_installation - {@linkcode InstallationRule.calcule_configuration}
 * @param props.pn_saisi - Puissance nominale saisie du système de chauffage en kW
 * @param props.role - {@linkcode calcule_role}
 * @param props.systemes - Autres systèmes collectifs OU individuels associés à l'installation de chauffage
 * @param props.systemes.role - {@linkcode calcule_role}
 * @param props.systemes.pn_saisi - Puissance nominale saisie du système de chauffage en kW
 * @return Ratio de dimensionnement du système de chauffage
 */
export function calcule_rdim(props: {
	configuration_installation: InstallationRule.Configuration;
	pn_saisi: number | null;
	role: Chauffage.Systeme.Role;
	systemes: {
		role: Chauffage.Systeme.Role;
		pn_saisi: number | null;
	}[];
}): number {
	const { configuration_installation, pn_saisi, role } = props;
	const rdim_role = configuration_installation[role];
	const systemes = props.systemes.filter((s) => s.role === role);
	const n = systemes.length + 1;

	// Un seul système de chauffage pour la base, la relève ou l'appoint
	if (n === 1) return rdim_role;
	// Les puissances nominales sont connues pour tous les systèmes
	if (systemes.every((s) => s.pn_saisi !== null) && pn_saisi !== null) {
		const somme_pn =
			systemes.reduce((acc, s) => acc + (s.pn_saisi ?? 0), 0) + pn_saisi;
		return rdim_role * (pn_saisi / somme_pn);
	}
	return rdim_role * (1 / n);
}

/**
 * @param props.type_installation - Type de l'installation de chauffage
 * @param props.type_systeme - Type de système de chauffage
 * @param props.type_generateur - {@linkcode GenerateurRule.set_type_generateur}
 * @param props.systemes - Autres systèmes collectifs OU individuels associés à l'installation de chauffage
 * @param props.systemes[].type_systeme - Type de système de chauffage
 * @param props.systemes[].type_generateur - {@linkcode GenerateurRule.set_type_generateur}
 * @param props.systemes[].energie_generateur - {@linkcode GenerateurRule.set_energie_generateur}
 * @return Rôle du système de chauffage dans l'installation de chauffage
 */
export function calcule_role(props: {
	type_installation: Chauffage.Installation.TypeInstallation;
	type_systeme: Chauffage.Systeme.TypeSysteme;
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	systemes: {
		type_systeme: Chauffage.Systeme.TypeSysteme;
		type_generateur: Chauffage.Generateur.TypeGenerateur;
		energie_generateur: Chauffage.Generateur.EnergieChauffage;
	}[];
}): {
	role: Chauffage.Systeme.Role;
	type_releve: Chauffage.Systeme.TypeReleve | null;
} {
	const { type_installation, type_systeme, type_generateur, systemes } = props;

	// Installation de chauffage divisé
	if (type_installation === Chauffage.Installation.TypeInstallationEnum.divise)
		return { role: Chauffage.Systeme.RoleEnum.base, type_releve: null };

	// Installation de chauffage central - Appoint
	if (type_systeme === Chauffage.Systeme.TypeSystemeEnum.divise)
		return { role: Chauffage.Systeme.RoleEnum.appoint, type_releve: null };

	// Systèmes de chauffage central
	const systemes_central = systemes.filter(
		(s) => s.type_systeme === Chauffage.Systeme.TypeSystemeEnum.central,
	);
	// Installation de chauffage central avec un seul système de chauffage central
	if (systemes_central.length === 0)
		return { role: Chauffage.Systeme.RoleEnum.base, type_releve: null };

	// Liste des chaudières parmi les systèmes de chauffage central
	const chaudieres = systemes_central.filter(
		(s) =>
			s.type_generateur === Chauffage.Generateur.TypeGenerateurEnum.chaudiere,
	);
	// Liste des chaudières bois parmi les systèmes de chauffage central
	const chaudieres_bois = chaudieres.filter((s) => {
		return (
			s.type_generateur === Chauffage.Generateur.TypeGenerateurEnum.chaudiere &&
			Common.ENERGIES_BOIS.includes(s.energie_generateur)
		);
	});
	// Liste des PAC parmi les systèmes de chauffage central
	const pacs = systemes_central.filter((s) =>
		Chauffage.Generateur.TYPES_PAC.includes(s.type_generateur),
	);
	// Installation de chauffage central avec différents systèmes couplés
	if (chaudieres.length + pacs.length !== systemes_central.length)
		return { role: Chauffage.Systeme.RoleEnum.base, type_releve: null };

	// Installation de chauffage central - PAC en relève de chaudière bois
	const isPAC = Chauffage.Generateur.TYPES_PAC.includes(type_generateur);
	const isChaudiere =
		type_generateur === Chauffage.Generateur.TypeGenerateurEnum.chaudiere;

	if ((isPAC || isChaudiere) && chaudieres_bois.length > 0)
		return {
			role: Chauffage.Systeme.RoleEnum.releve,
			type_releve: Chauffage.Systeme.TypeReleveEnum.releve_chaudiere_bois,
		};

	// Installation de chauffage central - Chaudières en relève de PAC
	if (isChaudiere && pacs.length > 0)
		return {
			role: Chauffage.Systeme.RoleEnum.releve,
			type_releve: Chauffage.Systeme.TypeReleveEnum.releve_pac,
		};

	// Autres cas
	return { role: Chauffage.Systeme.RoleEnum.base, type_releve: null };
}

/**
 * @param props.pch_installation: {@linkcode InstallationRule.calcule_pch}
 * @param props.installation_collective: Installation collective
 * @param props.generateur_individuel: Générateur individuel
 * @param props.systemes: Autres systèmes de chauffage associés à l'installation de chauffage
 * @param props.systemes[].generateur_individuel: Générateur individuel
 */
export function calcule_pch(props: {
	pch_installation: number;
	installation_collective: boolean;
	generateur_individuel: boolean;
	systemes: { generateur_individuel: boolean }[];
}): number {
	const { pch_installation, installation_collective, generateur_individuel } =
		props;
	const systemes = props.systemes.filter(
		(s) => s.generateur_individuel === generateur_individuel,
	);
	const N = systemes.length + 1;
	return installation_collective && generateur_individuel
		? 0.5 * pch_installation * (1 / N)
		: pch_installation * (1 / N);
}

/**
 * @param props.pn : {@linkcode GenerateurRule.calcule_pn}
 * @param props.rd : {@linkcode calcule_rd}
 * @param props.re : {@linkcode calcule_re}
 * @param props.rr : {@linkcode calcule_rr}
 * @return Puissance émise utile du système de chauffage collectif en kW
 */
export function calcule_pe(props: {
	pn: number;
	rd: number;
	re: NonEmptyArray<number>;
	rr: NonEmptyArray<number>;
}): number {
	const { pn, rd } = props;
	const re = props.re.reduce((acc, value) => acc + value, 0) / props.re.length;
	const rr = props.rr.reduce((acc, value) => acc + value, 0) / props.rr.length;
	return pn * rd * re * rr;
}

/**
 * @param props.tbase : {@linkcode ClimatRule.calcule_tbase}
 * @param props.t : {@linkcode calcule_t}
 * @param props.text : {@linkcode ClimatRule.calcule_sollicitations}
 * @param props.nref : {@linkcode ChauffageRule.calcule_nref}
 * @return Degré heure base T en °C.h/mois
 */
export function calcule_dht(props: {
	tbase: number;
	t: Common.ParMois<number>;
	text: Common.ParMois<number>;
	nref: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { tbase } = props;
	return createParMois((mois) => {
		const t = props.t[mois];
		const text = props.text[mois];
		const nref = props.nref[mois];
		const x = 0.5 * ((t - tbase) / (text - tbase));
		return (
			nref * (text - tbase) * x ** 5 * (14 - 28 * x + 20 * x ** 2 - 5 * x ** 3)
		);
	});
}

/**
 * @param props.bch : {@linkcode InstallationRule.calcule_bch}
 * @param props.pe : {@linkcode calcule_pe}
 * @param props.dh14 : {@linkcode ClimatRule.calcule_sollicitations}
 * @return Température de dimensionnement du système de chauffage collectif en °C/mois
 */
export function calcule_t(props: {
	bch: Common.ParMois<number>;
	pe: number;
	dh14: Common.ParMois<number>;
}): Common.ParMois<number> {
	const { pe } = props;
	return createParMois((mois) => {
		const bch = props.bch[mois];
		const dh14 = props.dh14[mois];
		return 14 - (pe * dh14) / bch;
	});
}

/**
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.sh : Surface habitable en m²
 * @param props.hsp : Hauteur sous plafond moyenne en m
 * @param props.i0 : {@linkcode calcule_i0}
 * @return Facteur d'intermittence du système de chauffage
 */
export function calcule_int(props: {
	gv: number;
	sh: number;
	hsp: number;
	i0: number;
}): number {
	const { gv, sh, hsp, i0 } = props;
	const G = gv / (sh * hsp);
	return i0 / (1 + 0.1 * (G - 1));
}

/**
 * @param props.type_batiment : Type de bâtiment
 * @param props.type_chauffage : Type de chauffage
 * @param props.type_emission : {@linkcode calcule_type_emission}
 * @param props.inertie : {@linkcode EnveloppeRule.calcule_inertie}
 * @param props.installation_collective : Installation collective ou individuelle
 * @param props.comptage_individuel : Présence de comptage individuel
 * @param props.regulation_terminale : Présence de régulation terminale
 * @param props.type_programmation : Type de programmation de l'installation de chauffage
 * @return Coefficient d'intermittence du système de chauffage
 */
export function calcule_i0(props: {
	type_batiment: Batiment.TypeBatiment;
	type_chauffage: Chauffage.Installation.TypeInstallation;
	type_emission: Chauffage.Systeme.TypeEmission;
	inertie: Enveloppe.Common.Inertie;
	installation_collective: boolean;
	comptage_individuel: boolean | null;
	regulation_terminale: boolean | null;
	type_programmation: Chauffage.Installation.TypeProgrammation;
	type_generateur: Chauffage.Generateur.TypeGenerateur;
}): number {
	const { type_generateur, ...query } = props;
	const abaque = abaques.chauffage.i0;
	const data = abaque.load();

	// Cas des convecteurs bi-jonction
	if (
		type_generateur ===
		Chauffage.Generateur.TypeGenerateurEnum.convecteur_bi_jonction
	) {
		const q1 = query;
		q1.installation_collective = true;
		const match1 = abaque.search(q1, data).at(0);
		if (!match1) throw new ValeurForfaitaireError(q1);
		const i0_1 = match1.i0;

		const q2 = query;
		q2.installation_collective = false;
		const match2 = abaque.search(q2, data).at(0);
		if (!match2) throw new ValeurForfaitaireError(q2);
		const i0_2 = match2.i0;

		return i0_1 * 0.6 + i0_2 * 0.4;
	}
	// Autres cas
	const match = abaque.search(props, data).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.i0;
}

/**
 * @param props.rd : {@linkcode calcule_rd}
 * @param props.re : {@linkcode calcule_re}
 * @param props.rg : {@linkcode calcule_rg} ou 1 pour calculer Ich de la partie thermodynamique d'une PAC hybride
 * @param props.rr : {@linkcode calcule_rr}
 * @param props.scop : {@linkcode GenerateurRule.calcule_scop} ou null pour calculer Ich d'un système de chauffage non hybride
 * @return Inverse du rendement du système de chauffage
 */
export function calcule_ich(props: {
	rd: number;
	rg: number;
	re: number;
	rr: number;
	scop: number | null;
}): number {
	const { rd, rg, re, rr } = props;
	return props.scop ? 1 / (rd * re * rr * props.scop) : 1 / (rd * re * rg * rr);
}

/**
 * @param props.type_distribution - Type de distribution du système de chauffage
 * @param props.temperature_distribution - {@linkcode set_temperature_distribution}
 * @param props.presence_fluide_frigorigene - Présence de fluide frigorigène dans le réseau de chauffage
 * @param props.reseau_collectif - Système de chauffage collectif ou individuel
 * @param props.isolation_reseau - {@linkcode set_isolation_reseau}
 * @return Rendement de distribution du système de chauffage
 */
export function calcule_rd(props: {
	type_distribution: Chauffage.Systeme.TypeDistribution | null;
	temperature_distribution: Chauffage.Systeme.TemperatureDistribution | null;
	presence_fluide_frigorigene: boolean | null;
	reseau_collectif: boolean | null;
	isolation_reseau: boolean | null;
}): number {
	const { type_distribution } = props;
	if (null === type_distribution) return 1;
	const abaque = abaques.chauffage.rd;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.rd;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/50
 * @param props.types_emission - {@linkcode calcule_type_emission}
 * @param props.type_generateur - {@linkcode GenerateurRule.set_type_generateur}
 * @param props.label_generateur - Label du générateur de chauffage
 * @return Rendement d'émission du système de chauffage
 */
export function calcule_re(props: {
	types_emission: NonEmptyArray<Chauffage.Systeme.TypeEmission>;
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	label_generateur: Chauffage.Generateur.Label | null;
}): number {
	const { types_emission, ...query } = props;
	const abaque = abaques.chauffage.re;
	const data = abaque.load();

	const n = types_emission.length;
	const s = types_emission.reduce((acc, type_emission) => {
		const q = { ...query, type_emission };
		const match = abaque.search(q, data).at(0);
		if (!match) throw new ValeurForfaitaireError(q);
		return acc + match.re;
	}, 0);
	return s / n;
}

export type RgCombustionProps = {
	/** {@linkcode GenerateurRule.set_type_generateur_combustion} */
	type_generateur_combustion: Chauffage.Generateur.TypeGenerateurCombustion;
	/** {@linkcode GenerateurRule.calcule_combustion} */
	qp0: number;
	/** {@linkcode GenerateurRule.calcule_combustion} */
	pveilleuse: number;
	/** {@linkcode GenerateurRule.calcule_kpcs} */
	kpcs: number;
	/** {@linkcode calcule_pmfou} */
	pmfou: number;
	/** {@linkcode calcule_pmcons} */
	pmcons: number;
};
export type RgAutresProps = {
	/** {@linkcode GenerateurRule.set_type_generateur_combustion} */
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	/** {@linkcode GenerateurRule.set_energie_generateur} */
	energie_generateur: Chauffage.Generateur.EnergieChauffage;
	/** {@linkcode GenerateurRule.set_annee_installation} */
	annee_installation_generateur: number;
	// Label du générateur de chauffage
	label_generateur: Chauffage.Generateur.Label | null;
};

/**
 * @param props {@linkcode RgCombustionProps} ou {@linkcode RgAutresProps}
 * @return Rendement de génération du système de chauffage
 */
export function calcule_rg(props: RgCombustionProps | RgAutresProps): number {
	if ("type_generateur_combustion" in props) {
		const { kpcs, pmfou, pmcons } = props;
		const qp0 = props.qp0 / kpcs;
		const pveilleuse = props.pveilleuse / 1000 / kpcs;
		return (pmfou / (pmcons + 0.45 * qp0 + pveilleuse)) * kpcs;
	}
	if (Chauffage.Generateur.TYPES_PAC.includes(props.type_generateur)) {
		return 1;
	}
	const abaque = abaques.chauffage.rg;
	const query = props;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.rg;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/50
 * @param props.types_emissions - {@linkcode calcule_type_emission}
 * @param props.type_generateur - {@linkcode GenerateurRule.set_type_generateur}
 * @param props.label_generateur - Label du générateur de chauffage
 * @param props.reseau_collectif - Système de chauffage collectif ou individuel
 * @param props.presence_robinet_thermostatique - Présence de robinet thermostatique sur l'émetteur
 * @param props.presence_regulation_terminale - Présence de régulation terminale
 * @return Rendement de régulation du système de chauffage
 */
export function calcule_rr(props: {
	types_emission: NonEmptyArray<Chauffage.Systeme.TypeEmission>;
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	label_generateur: Chauffage.Generateur.Label | null;
	reseau_collectif: boolean | null;
	presence_robinet_thermostatique: boolean | null;
	presence_regulation_terminale: boolean;
}): number {
	const { types_emission, ...query } = props;
	const abaque = abaques.chauffage.rr;
	const data = abaque.load();

	const n = types_emission.length;
	const s = types_emission.reduce((acc, type_emission) => {
		const q = { ...query, type_emission };
		const match = abaque.search(q, data).at(0);
		if (!match) throw new ValeurForfaitaireError(q);
		return acc + match.rr;
	}, 0);
	return s / n;
}

/**
 * @param props.zone_climatique : {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.type_generateur : {@linkcode GenerateurRule.set_type_generateur}
 * @param props.bienergie_generateur : Energie secondaire de la PAC hybride
 * @return Facteur d'utilisation du mode thermodynamique des PAC hybrides
 */
export function calcule_fut_pac_hyb(props: {
	zone_climatique: Batiment.ZoneClimatique;
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	bienergie_generateur: Chauffage.Generateur.Bienergie | null;
}): number {
	const { zone_climatique, type_generateur, bienergie_generateur } = props;

	if (!Chauffage.Generateur.TYPES_PAC.includes(type_generateur)) return 0;
	if (null === bienergie_generateur) return 1;
	switch (zone_climatique) {
		case Batiment.ZoneClimatiqueEnum.H1a:
		case Batiment.ZoneClimatiqueEnum.H1b:
		case Batiment.ZoneClimatiqueEnum.H1c:
			return 0.8;

		case Batiment.ZoneClimatiqueEnum.H2a:
		case Batiment.ZoneClimatiqueEnum.H2b:
		case Batiment.ZoneClimatiqueEnum.H2c:
		case Batiment.ZoneClimatiqueEnum.H2d:
			return 0.83;
		case Batiment.ZoneClimatiqueEnum.H3:
			return 0.88;
	}
}

/**
 * @param props.type_generateur - {@linkcode GenerateurRule.set_type_generateur}
 * @param props.type_distribution - Type de distribution du système de chauffage
 * @param props.type_emetteur - Type d'émetteur du système de chauffage
 * @return Type d'émission du système de chauffage
 */
export function calcule_type_emission(props: {
	type_generateur: Chauffage.Generateur.TypeGenerateur;
	type_distribution: Chauffage.Systeme.TypeDistribution | null;
	type_emetteur: Chauffage.Emetteur.TypeEmetteur | null;
}): Chauffage.Systeme.TypeEmission {
	const query = props;
	const abaque = abaques.chauffage.emission;
	const match = abaque.search(query, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(query);
	return match.type_emission as Chauffage.Systeme.TypeEmission;
}

/**
 * @param props.pfou : {@linkcode calcule_pfou}
 * @return Puissance moyenne fournie en kW
 */
export function calcule_pmfou(props: {
	pfou: Chauffage.ParTauxCharge<number>;
}): number {
	const { pfou } = props;
	return Object.values(pfou).reduce((acc, pfou) => acc + pfou, 0);
}

/**
 * @param props.pcons : {@linkcode calcule_pcons}
 * @return Puissance moyenne consommée en kW
 */
export function calcule_pmcons(props: {
	pcons: Chauffage.ParTauxCharge<number>;
}): number {
	const { pcons } = props;
	return Object.values(pcons).reduce((acc, pcons) => acc + pcons, 0);
}

/**
 * @param props.p : {@linkcode calcule_p}
 * @param props.coeff_pond_final : {@linkcode calcule_coeff_pond_final}
 * @return Puissance fournie au point de fonctionnement x en kW
 */
export function calcule_pfou(props: {
	p: Chauffage.ParTauxCharge<number>;
	coeff_pond_final: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	return createParTauxCharge((x) => props.p[x] * props.coeff_pond_final[x]);
}

/**
 * @param props.p : {@linkcode calcule_p}
 * @param props.pfou : {@linkcode calcule_pfou}
 * @param props.qp : {@linkcode calcule_qp}
 * @return Puissance consommée au point de fonctionnement x en kW
 */
export function calcule_pcons(props: {
	p: Chauffage.ParTauxCharge<number>;
	pfou: Chauffage.ParTauxCharge<number>;
	qp: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	return createParTauxCharge((x) => {
		const p_x = props.p[x];
		const pfou_x = props.pfou[x];
		const qp_x = props.qp[x];
		return pfou_x * ((p_x + qp_x) / p_x);
	});
}

/**
 * @param props.pn : {@linkcode GenerateurRule.calcule_pn}
 * @param props.tch_final : {@linkcode calcule_tch_final}
 * @return Puissance au point de fonctionnement x en kW
 */
export function calcule_p(props: {
	pn: number;
	tch_final: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	const { pn } = props;
	return createParTauxCharge((x) => props.tch_final[x] * pn);
}

/**
 * @param props.type_generateur : {@linkcode GenerateurRule.set_type_generateur_combustion}
 * @param props.kpcs : {@linkcode GenerateurRule.calcule_kpcs}
 * @param props.pn : {@linkcode GenerateurRule.calcule_pn}
 * @param props.qp0 : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.rpn : {@linkcode GenerateurRule.calcule_combustion}
 * @param props.tch_final : {@linkcode calcule_tch_final}
 * @return Pertes au point de fonctionnement x en kW
 */
export function calcule_qp(
	props: {
		kpcs: number;
		pn: number;
		qp0: number;
		rpn: number;
		tch_final: Chauffage.ParTauxCharge<number>;
	} & GenerateurRule.QPx,
): Chauffage.ParTauxCharge<number> {
	const { type_generateur, kpcs, pn } = props;
	const qp0 = props.qp0 / kpcs;
	const rpn = (props.rpn * 100) / kpcs;
	const enums = Chauffage.Generateur.TypeGenerateurCombustionEnum;

	return createParTauxCharge((x) => {
		const tch = props.tch_final[x];

		switch (type_generateur) {
			case enums.chaudiere_standard: {
				const { qp30, qp100 } = props;
				return x < 30
					? ((qp30 - 0.15 * qp0) * tch) / 0.3 + 0.15 * qp0
					: ((qp100 - qp30) * tch) / 0.7 + qp30 - ((qp100 - qp30) * 0.3) / 0.7;
			}
			case enums.chaudiere_basse_temperature:
			case enums.chaudiere_condensation: {
				const { qp30, qp100 } = props;
				const qp15 = qp30 / 2;
				if (x === 15) return qp15;
				return x < 30
					? ((qp30 - qp15) * tch) / 0.15 + qp15 - ((qp30 - qp15) * 0.15) / 0.15
					: ((qp100 - qp30) * tch) / 0.7 + qp30 - ((qp100 - qp30) * 0.3) / 0.7;
			}

			case enums.generateur_air_chaud:
			case enums.chaudiere_bois: {
				const { qp50, qp100 } = props;
				return x < 50
					? ((qp50 - 0.15 * qp0) * tch) / 0.5 + 0.15 * qp0
					: ((qp100 - qp50) * tch) / 0.5 + 2 * qp50 - qp100;
			}
			case enums.radiateur_gaz: {
				return 1.04 * ((100 - rpn) / rpn) * pn * tch;
			}
		}
	});
}

/**
 * @return Taux de charge en valeur décimale
 */
export function calcule_tch(): Chauffage.ParTauxCharge<number> {
	return createParTauxCharge((x) => x / 100);
}

/**
 * @param props.tch : {@linkcode calcule_tch}
 * @param props.cdim_ref : {@linkcode calcule_cdim_ref}
 * @return Taux de charge dimensionné en valeur décimale
 */
export function calcule_tch_dim(props: {
	tch: Chauffage.ParTauxCharge<number>;
	cdim_ref: number;
}): Chauffage.ParTauxCharge<number> {
	const { cdim_ref } = props;
	return createParTauxCharge((x) => {
		const tch = props.tch[x];
		return x === 95 ? tch : Math.min(tch / cdim_ref, 1);
	});
}

/**
 * @param props.prel : {@linkcode calcule_prel}
 * @param props.tch_dim : {@linkcode calcule_tch_dim}
 * @param props.ctch : {@linkcode calcule_ctch_1} | {@linkcode calcule_ctch_2}
 * @return Taux de charge final en valeur décimale
 */
export function calcule_tch_final(props: {
	prel: number;
	tch_dim: Chauffage.ParTauxCharge<number>;
	ctch: Chauffage.ParTauxCharge<number> | null | undefined;
}): Chauffage.ParTauxCharge<number> {
	const { prel } = props;
	return createParTauxCharge((x) => {
		const tch_dim = props.tch_dim[x];
		const ctch = props.ctch ? props.ctch[x] : null;
		return ctch ? Math.min(1, ctch / prel) : tch_dim;
	});
}

/**
 * @return Coefficient de pondération au point de fonctionnement x
 */
export function calcule_coeff_pond(): Chauffage.ParTauxCharge<number> {
	return createParTauxCharge((x) => {
		if (x === 5) return 0.1;
		else if (x === 15) return 0.25;
		else if (x === 25) return 0.2;
		else if (x === 35) return 0.15;
		else if (x === 45 || x === 55) return 0.1;
		else if (x === 65) return 0.05;
		else if (x === 75 || x === 85) return 0.025;
		else return 0;
	});
}

/**
 * @param props.coeff_pond : {@linkcode calcule_coeff_pond}
 * @return Coefficient de pondération au point de fonctionnement - Variable fantôme issue de la méthode 3CL-DPE 2021
 */
export function calcule_coeff_pond_dim(props: {
	coeff_pond: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	return props.coeff_pond;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/51
 * @param props.tch_dim : {@linkcode calcule_tch_dim}
 * @param props.coeff_pond_dim : {@linkcode calcule_coeff_pond_dim}
 * @param props.ctch : {@linkcode calcule_ctch_1} | {@linkcode calcule_ctch_2}
 * @return Coefficient de pondération final au point de fonctionnement x
 */
export function calcule_coeff_pond_final(props: {
	tch_dim: Chauffage.ParTauxCharge<number>;
	coeff_pond_dim: Chauffage.ParTauxCharge<number>;
	ctch: Chauffage.ParTauxCharge<number> | null | undefined;
}): Chauffage.ParTauxCharge<number> {
	const { tch_dim, coeff_pond_dim, ctch } = props;
	return createParTauxCharge((x) => {
		const coeff_pond_dim_x = coeff_pond_dim[x];
		if (!ctch) return coeff_pond_dim_x;
		const ctch_x = ctch[x];
		const tch_dim_x = tch_dim[x];

		const somme = Chauffage.TAUX_CHARGE.reduce((acc, x) => {
			const tch_dim_x = tch_dim[x];
			const coeff_pond_dim_x = coeff_pond_dim[x];
			const ctch_x = ctch[x];
			return acc + (ctch_x / tch_dim_x) * coeff_pond_dim_x;
		}, 0);

		return ((ctch_x / tch_dim_x) * coeff_pond_dim_x) / somme;
	});
}

/**
 * @param props.prel : {@linkcode calcule_prel}
 * @param props.priorite_cascade : Indique si la cascade est prioritaire ou non
 * @param props.tch_dim : {@linkcode calcule_tch_dim}
 * @return Contribution au taux de charge du premier système en cascade
 */
export function calcule_ctch_1(props: {
	prel: number;
	priorite_cascade: boolean;
	tch_dim: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	const { prel, priorite_cascade } = props;
	return createParTauxCharge((x) => {
		const tch_dim = props.tch_dim[x];
		return priorite_cascade ? Math.min(prel, tch_dim) : prel * tch_dim;
	});
}

/**
 * @param props.prel : {@linkcode calcule_prel}
 * @param props.priorite_cascade : Indique si la cascade est prioritaire ou non
 * @param props.tch_dim : {@linkcode calcule_tch_dim}
 * @param props.ctch_1 : {@linkcode calcule_ctch_1}
 * @return Contribution au taux de charge du deuxième système en cascade
 */
export function calcule_ctch_2(props: {
	prel: number;
	priorite_cascade: boolean;
	tch_dim: Chauffage.ParTauxCharge<number>;
	ctch_1: Chauffage.ParTauxCharge<number>;
}): Chauffage.ParTauxCharge<number> {
	const { prel, priorite_cascade } = props;
	return createParTauxCharge((x) => {
		const tch_dim = props.tch_dim[x];
		const ctch_1 = props.ctch_1[x];
		return priorite_cascade ? Math.min(prel, tch_dim - ctch_1) : prel * tch_dim;
	});
}

/**
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.tbase : {@linkcode ClimatRule.calcule_tbase}
 * @param props.tcons : {@linkcode calcule_tcons}
 * @param props.pn_combustion : {@linkcode calcule_pn_combustion}
 * @return Coefficient de pondération permettant de prendre en compte les charges partielles
 */
export function calcule_cdim_ref(props: {
	gv: number;
	tbase: number;
	tcons: number;
	pn_combustion: number;
}): number {
	const { gv, tbase, tcons, pn_combustion } = props;
	return (1000 * pn_combustion) / (gv * (tcons - tbase));
}

/**
 * @param props.scenario : Scénario d'usage
 * @return Température de consigne en °C
 */
export function calcule_tcons(props: { scenario: Common.Scenario }): number {
	const { scenario } = props;
	switch (scenario) {
		case Common.ScenarioEnum.conventionnel:
			return 19;
		case Common.ScenarioEnum.depensier:
			return 21;
	}
}

/**
 * @param props.pn : {@linkcode GenerateurRule.calcule_pn}
 * @param props.pn_cascade : {@linkcode calcule_pn_cascade}
 * @return Puissance relative du générateur en cascade
 */
export function calcule_prel(props: {
	pn: number;
	pn_cascade: number;
}): number {
	const { pn, pn_cascade } = props;
	return pn_cascade ? pn / pn_cascade : 1;
}

/**
 * @param props.systemes : Liste des systèmes de chauffage individuels OU collectifs associés
 * @param props.systemes[].energie : Énergie du générateur
 * @param props.systemes[].pn : {@linkcode GenerateurRule.calcule_pn} du générateur en kW
 * @param props.pn : Puissance nominale des générateurs en kW
 */
export function calcule_pn_combustion(props: {
	systemes: NonEmptyArray<{
		energie: Chauffage.Generateur.EnergieChauffage;
		pn: number;
	}>;
}): number {
	const { systemes } = props;
	return systemes
		.filter((s) => Common.ENERGIES_COMBUSTION.includes(s.energie))
		.reduce((acc, s) => acc + s.pn, 0);
}

/**
 * @param props.systemes : Liste des systèmes de chauffage individuels OU collectifs associés
 * @param props.systemes[].energie : Énergie du générateur
 * @param props.systemes[].pn : {@linkcode GenerateurRule.calcule_pn} du générateur en kW
 * @param props.systemes[].cascade : Indique si le système de chauffage est en cascade ou non
 * @return Puissance nominale des générateurs de chauffage en cascade en kW
 */
export function calcule_pn_cascade(props: {
	systemes: NonEmptyArray<{
		energie: Chauffage.Generateur.EnergieChauffage;
		pn: number;
		cascade: boolean;
	}>;
}): number {
	const { systemes } = props;
	return systemes
		.filter((s) => Common.ENERGIES_COMBUSTION.includes(s.energie) && s.cascade)
		.reduce((acc, s) => acc + s.pn, 0);
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/49
 * @param props.gv : {@linkcode EnveloppeRule.calcule_gv}
 * @param props.tbase : {@linkcode ClimatRule.calcule_tbase}
 * @param props.sh : Surface de l'InstallationRule de chauffage en m²
 * @param props.niveaux_desservis : Nombre de niveaux desservis par l'InstallationRule de chauffage
 * @param props.presence_circulateur_externe : Présence d'un circulateur externe à l'InstallationRule de chauffage
 * @param props.rdim : {@linkcode InstallationRule.calcule_rdim}
 * @param props.emetteurs[].delta_pem : {@linkcode EmetteurRule.calcule_delta_pem}
 * @param props.emetteurs[].fcot : {@linkcode EmetteurRule.calcule_fcot}
 * @param props.emetteurs[].dtheta_dim : {@linkcode EmetteurRule.calcule_dtheta_dim}
 * @return Puissance du circulateur de l'InstallationRule de chauffage en W
 */
export function calcule_pcircem(props: {
	gv: number;
	tbase: number;
	sh: number;
	niveaux_desservis: number;
	presence_circulateur_externe: boolean | null;
	rdim: number;
	emetteurs: {
		delta_pem: number;
		fcot: number;
		dtheta_dim: number;
	}[];
}): number {
	const { emetteurs } = props;
	if (emetteurs.length === 0) return 0;
	const { presence_circulateur_externe } = props;
	if (!presence_circulateur_externe) return 0;

	const { gv, tbase, sh, niveaux_desservis, rdim } = props;
	const fcot = Math.max(...emetteurs.map((i) => i.fcot));
	const dtheta_dim = Math.max(...emetteurs.map((i) => i.dtheta_dim));
	const delta_pem = Math.max(...emetteurs.map((i) => i.delta_pem));

	// Puissance nominale en chaud en kW
	const pnc = 10 ** -3 * gv * (20 - tbase);
	// Longueur du réseau en m
	const lem = 5 * fcot * (niveaux_desservis + (sh / niveaux_desservis) ** 0.5);
	// Pertes de charge du réseau en kPa
	const delta_pmnnom = 0.15 * lem + delta_pem;
	// Débit nominal du circulateur en m3/h
	const qvemnom = (pnc * rdim) / (1.163 * dtheta_dim);

	return Math.max(
		30,
		6.44 *
			(delta_pmnnom * (qvemnom / Math.max(1, sh / 400))) ** 0.676 *
			Math.max(1, sh / 400),
	);
}

/**
 * @param props.temperature_distribution : Température de distribution du réseau de chauffage saisie
 * @return Température de distribution du réseau de chauffage retenue
 */
export function set_temperature_distribution(props: {
	temperature_distribution: Chauffage.Systeme.TemperatureDistribution | null;
}): Chauffage.Systeme.TemperatureDistribution {
	const { temperature_distribution } = props;
	return (
		temperature_distribution ??
		Chauffage.Systeme.TemperatureDistributionEnum.haute
	);
}

/**
 * @param props.isolation_reseau : Isolation du réseau de chauffage saisie
 * @return Isolation du réseau de chauffage retenue
 */
export function set_isolation_reseau(props: {
	isolation_reseau: boolean | null;
}): boolean {
	return props.isolation_reseau ?? false;
}
