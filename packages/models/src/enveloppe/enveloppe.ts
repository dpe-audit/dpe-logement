import { buildEnum, type NonEmptyArray } from "../utils.js";
import type { Baie } from "./baie.js";
import type { Inertie } from "./common.js";
import type { LocalNonChauffe } from "./local-non-chauffe.js";
import type { Masque } from "./masque.js";
import type { Mur } from "./mur.js";
import type { Niveau } from "./niveau.js";
import type { PlancherBas } from "./plancher-bas.js";
import type { PlancherHaut } from "./plancher-haut.js";
import type { PontThermique } from "./pont-thermique.js";
import type { Porte } from "./porte.js";

/**
 * @see https://schemas.open-dpe.fr/enveloppe
 */
export type Enveloppe = {
	exposition: Exposition;
	q4pa_conv: number | null;
	presence_brasseurs_air: boolean;
	niveaux: NonEmptyArray<Niveau>;
	locaux_non_chauffes: LocalNonChauffe[];
	murs: Mur[];
	planchers_hauts: PlancherHaut[];
	planchers_bas: PlancherBas[];
	baies: Baie[];
	portes: Porte[];
	ponts_thermiques: PontThermique[];
	masques: Masque[];
};

export type EnveloppeWithData<T extends Enveloppe = Enveloppe> = T & {
	data: EnveloppeData;
};

export type EnveloppeData = {
	inertie: Inertie;
	parois_anciennes_lourdes: boolean;
	deperditions: Deperditions;
	permeabilite: Permeabilite;
	confort_ete: ConfortEte;
};

export type Deperditions = {
	gv: number;
	ubat: number;
	pt: number;
	dp: {
		total: number;
		murs: number;
		planchers_hauts: number;
		planchers_bas: number;
		baies: number;
		portes: number;
	};
	dr: {
		total: number;
		hperm: number;
		hvent: number;
	};
};

export type Permeabilite = {
	q4pa_conv: number;
	presence_joints_menuiserie: boolean;
};

export type ConfortEte = {
	inertie_lourde: boolean;
	isolation_plancher_haut: boolean | null;
	presence_protection_solaire: boolean | null;
	logement_traversant: boolean | null;
	presence_brasseurs_air: boolean | null;
};

export const EXPOSITIONS = ["simple", "multiple"] as const;
export type Exposition = (typeof EXPOSITIONS)[number];
export const ExpositionEnum = buildEnum(EXPOSITIONS);
