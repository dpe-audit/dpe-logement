import { abaques } from "@open-dpe-logement/abaques";
import { Batiment, Common, Enveloppe } from "@open-dpe-logement/models";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as ClimatRule from "#rules/climat/functions.js";
import * as LocalNonChauffeRule from "#rules/enveloppe/local-non-chauffe/functions.js";
import type { NonEmptyArray } from "#utils/helpers.js";

/**
 * @param props.surface : Surface de la paroi en m²
 * @param props.mitoyennete : Mitoyenneté de la paroi
 * @returns Surface déperditive de la paroi en m²
 */
export function calcule_sdep(props: {
	surface: number;
	mitoyennete: Enveloppe.Common.Mitoyennete;
}): number {
	const { surface, mitoyennete } = props;
	return mitoyennete !== Enveloppe.Common.MitoyenneteEnum.local_residentiel
		? surface
		: 0;
}

export function calcule_b(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
	blnc: number;
}): number;

export function calcule_b(props: {
	mitoyennete: Exclude<
		Enveloppe.Common.Mitoyennete,
		typeof Enveloppe.Common.MitoyenneteEnum.local_non_chauffe
	>;
	blnc: null;
}): number;

export function calcule_b(props: {
	mitoyennete: typeof Enveloppe.Common.MitoyenneteEnum.local_non_chauffe;
	blnc: number;
}): number;

/**
 * @param props.mitoyennete : Mitoyenneté de la paroi
 * @param props.blnc : {@linkcode LocalNonChauffeRule.calcule_b}
 * @see abaques.enveloppe.paroi.b
 * @returns Coefficient de réduction des déperditions thermiques de la paroi
 */
export function calcule_b(props: {
	mitoyennete: Enveloppe.Common.Mitoyennete;
	blnc: number | null;
}): number {
	const { mitoyennete, blnc } = props;

	switch (mitoyennete) {
		case Enveloppe.Common.MitoyenneteEnum.local_non_chauffe:
			return blnc!;
		case Enveloppe.Common.MitoyenneteEnum.local_non_residentiel:
			return 0.2;
		case Enveloppe.Common.MitoyenneteEnum.local_non_accessible:
			return 0.95;
		case Enveloppe.Common.MitoyenneteEnum.local_residentiel:
			return 0;
		default:
			return 1;
	}
}

/**
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.orientation_ets - Orientations de l'espace tampon solarisé
 * @param props.isolation_paroi - Indique si la paroi est isolée ou non
 * @see abaques.enveloppe.paroi.bver
 * @throws {Error} Aucune orientation d'espace tampon solarisé fournie
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient de réduction des déperditions thermiques de la paroi donnant sur un espace tampon solarisé
 */
export function calcule_bver(props: {
	zone_climatique: Batiment.ZoneClimatique;
	orientation_ets: NonEmptyArray<Common.Orientation>;
	isolation_paroi: boolean;
}): number {
	const { orientation_ets } = props;
	const abaque = abaques.enveloppe.paroi.bver;
	const data = abaque.load();

	const values = orientation_ets.map((orientation_ets) => {
		const query = { ...props, ...{ orientation_ets } };
		const match = abaque.search(query, data).at(0);
		if (!match) throw new ValeurForfaitaireError(query);
		return match.bver;
	});

	return values.reduce((acc, value) => acc + value, 0) / values.length;
}

/**
 * @param props.sdep : {@linkcode calcule_sdep}
 * @param props.b : {@linkcode calcule_b}
 * @param props.u : Coefficient de transmission thermique de la paroi en W/m²K
 * @returns Déperditions thermiques de la paroi en W/K
 */
export function calcule_dp(props: {
	sdep: number;
	b: number;
	u: number;
}): number {
	const { sdep, b, u } = props;
	return sdep * b * u;
}

/**
 * @param props.annee_installation - Année d'installation de la baie ou de la porte saisie
 * @param props.annee_construction_batiment - Année de construction du bâtiment
 * @return Année d'installation de la baie ou de la porte retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}

/**
 * @param props.annee_construction - Année de construction de la paroi saisie
 * @param props.annee_renovation - Année de rénovation de la paroi saisie
 * @param props.annee_construction_batiment - Année de construction du bâtiment
 * @return Année de construction de la paroi retenue
 */
export function set_annee_construction(props: {
	annee_construction: number | null;
	annee_renovation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_construction, annee_renovation, annee_construction_batiment } =
		props;
	return annee_construction ?? annee_renovation ?? annee_construction_batiment;
}
