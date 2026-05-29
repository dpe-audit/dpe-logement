import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment } from "@open-dpe-logement/models";
import * as ClimatRule from "#rules/climat/functions.js";
import * as RefroidissementRule from "#rules/refroidissement/functions.js";
import * as InstallationRule from "#rules/refroidissement/installation/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { reduceParMois } from "#utils/helpers.js";

/**
 * @param props.bfr - {@linkcode RefroidissementRule.calcule_bfr}
 * @param props.rdim - {@linkcode calcule_rdim}
 * @param props.eer - {@linkcode calcule_eer}
 * @returns Consommations du générateur de refroidissement en kWh/an
 */
export function calcule_cfr(props: {
	bfr: Common.ParMois<number>;
	rdim: number;
	eer: number;
}): number {
	const { rdim, eer } = props;
	const bfr = reduceParMois(props.bfr);
	return 0.9 * (bfr / eer) * rdim;
}

/**
 * @see https://github.com/dpe-audit/dpe-logement/issues/38
 * @returns Consommation d'énergie de l'auxiliaire de refroidissement en Wh/an
 */
export function calcule_caux(): number {
	return 0;
}

/**
 * @param props.installations - Liste des installations de refroidissement associées au générateur
 * @param props.installations[].rdim - {@linkcode InstallationRule.calcule_rdim}
 * @param props.installations[].n_generateurs - Nombre de générateurs de refroidissement associés à chaque installation
 * @returns Ratio de dimensionnement du générateur de refroidissement
 */
export function calcule_rdim(props: {
	installations: {
		rdim: number;
		n_generateurs: number;
	}[];
}): number {
	const { installations } = props;
	return installations.reduce((s, i) => s + i.rdim * (1 / i.n_generateurs), 0);
}

/**
 * @param props.zone_climatique - {@linkcode ClimatRule.calcule_zone_climatique}
 * @param props.annee_installation - {@linkcode set_annee_installation}
 * @param props.seer_saisi - Coefficient d'efficience énergétique saisonnier du générateur connu et justifié (SEER)
 * @see abaques.refroidissement.eer
 * @throws {ValeurForfaitaireError}
 * @returns Coefficient d'efficience énergétique du générateur de refroidissement (EER)
 */
export function calcule_eer(props: {
	zone_climatique: Batiment.ZoneClimatique;
	annee_installation: number;
	seer_saisi: number | null;
}) {
	const { seer_saisi } = props;

	if (seer_saisi && seer_saisi > 0) return seer_saisi * 0.95;

	const abaque = abaques.refroidissement.eer;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.eer;
}

/**
 * @param props.annee_installation - Année d'installation du générateur de refroidissement saisie
 * @param props.annee_construction_batiment - Année de construction du bâtiment
 * @return Année d'installation du générateur de refroidissement retenue
 */
export function set_annee_installation(props: {
	annee_installation: number | null;
	annee_construction_batiment: number;
}): number {
	const { annee_installation, annee_construction_batiment } = props;
	return annee_installation ?? annee_construction_batiment;
}
