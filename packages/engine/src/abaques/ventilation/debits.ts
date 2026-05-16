import type { RangeBounds } from "../filter";

export type DebitSchema = {
	type_ventilation: string[];
	type_generateur: string[];
	type_vmc: string[];
	presence_echangeur_thermique: boolean | null;
	generateur_collectif: boolean | null;
	annee_installation: RangeBounds;
	qvarep_conv: number;
	qvasouf_conv: number;
	smea_conv: number;
};

export type DebitQuery = {
	type_ventilation?: string;
	type_generateur?: string;
	type_vmc?: string;
	presence_echangeur_thermique?: boolean;
	generateur_collectif?: boolean;
	annee_installation?: number;
};
