import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment } from "@open-dpe-logement/models";
import toCEP from "#utils/to-cep.js";
import toEGES from "#utils/to-eges.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import * as climat from "#rules/climat/functions.js";
import * as refroidissement from "#rules/refroidissement/functions.js";
import * as installation from "#rules/refroidissement/installation/functions.js";

/**
 * @param props.bfr - {@linkcode refroidissement.calcule_bfr}
 * @param props.rdim - {@linkcode calcule_rdim}
 * @param props.eer - {@linkcode calcule_eer}
 * @returns Consommations d'énergie finale du générateur de refroidissement en kWh/an
 */
export function calcule_cef(props: {
	bfr: number;
	rdim: number;
	eer: number;
}): number {
	const { bfr, rdim, eer } = props;
	return 0.9 * (bfr / eer) * rdim;
}

/**
 * @param props.cef - {@linkcode calcule_cef}
 * @param props.energie - Energie utilisée par le générateur de refroidissement
 * @return Consommation d'énergie primaire du générateur de refroidissement en kWh
 */
export function calcule_cep(props: {
	cef: number;
	energie: Common.Energie;
}): number {
	const { cef, energie } = props;
	return toCEP({ cef, energie });
}

/**
 * @param props.cef - {@linkcode calcule_cef}
 * @param props.energie - Energie utilisée par le générateur de refroidissement
 * @param props.reseau_id - Identifiant du réseau de froid
 * @return Emissions de gaz à effet de serre du générateur de refroidissement en kgCO2eq
 */
export function calcule_eges(props: {
	cef: number;
	energie: Common.Energie;
	reseau_id: string | null;
}): number {
	const { cef, energie, reseau_id } = props;
	const usage = Common.UsageEnum.refroidissement;
	return toEGES({ cef, energie, usage, reseau_id });
}

/**
 * @param props.installations - Liste des installations de refroidissement associées au générateur
 * @param props.installations[].rdim - {@linkcode installation.calcule_rdim}
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
 * @param props.zone_climatique - {@linkcode climat.calcule_zone_climatique}
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
