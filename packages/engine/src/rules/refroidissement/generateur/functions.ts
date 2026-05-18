import toCEP from "#utils/to-cep.js";
import toEGES from "#utils/to-eges.js";
import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment } from "@open-dpe-logement/models";

/**
 * @params props.bfr - Besoin de refroidissement (kWh)
 * @params props.rdim - Ratio de dimensionnement du générateur
 * @params props.eer - Coefficient d'efficience énergétique du générateur (EER)
 * @returns Consommation d'énergie finale du générateur de refroidissement (kWh)
 */
export function cef(props: { bfr: number; rdim: number; eer: number }): number {
	const { bfr, rdim, eer } = props;
	return 0.9 * (bfr / eer) * rdim;
}

/**
 * @params props.cef - Consommation d'énergie finale du générateur de refroidissement (kWh)
 * @params props.energie - Energie utilisée par le générateur de refroidissement
 * @return Consommation d'énergie primaire du générateur de refroidissement (kWh)
 */
export function cep(props: { cef: number; energie: Common.Energie }): number {
	const { cef, energie } = props;
	return toCEP({ cef, energie });
}

/**
 * @params props.cef - Consommation d'énergie finale du générateur de refroidissement (kWh/an)
 * @params props.energie - Energie utilisée par le générateur de refroidissement
 * @params props.reseau_id - Identifiant du réseau de froid
 * @return Emissions de gaz à effet de serre du générateur de refroidissement (kgCO2eq/an)
 */
export function eges(props: {
	cef: number;
	energie: Common.Energie;
	reseau_id: string | null;
}): number {
	const { cef, energie, reseau_id } = props;
	const usage = Common.UsageEnum.refroidissement;
	return toEGES({ cef, energie, usage, reseau_id });
}

/**
 * @params props.installations - Liste des installations de refroidissement associées au générateur
 * @params props.installations[].rdim - Ratio de dimensionnement de chaque installation
 * @params props.installations[].n_generateurs - Nombre de générateurs de refroidissement associés à chaque installation
 * @returns Ratio de dimensionnement du générateur de refroidissement
 */
export function rdim(props: {
	installations: {
		rdim: number;
		n_generateurs: number;
	}[];
}): number {
	const { installations } = props;
	return installations.reduce((s, i) => s + i.rdim * (1 / i.n_generateurs), 0);
}

/**
 * @params props.zone_climatique - Zone climatique du bâtiment
 * @params props.annee_installation - Année d'installation du générateur de refroidissement
 * @params props.seer_saisi - Coefficient d'efficience énergétique saisonnier du générateur connu et justifié (SEER)
 *
 * @abaques refroidissement.eer
 * @throws {Error} Si aucune valeur forfaitaire n'est trouvée dans l'abaque pour les paramètres donnés
 *
 * @returns Coefficient d'efficience énergétique du générateur de refroidissement (EER)
 */
export function eer(props: {
	zone_climatique: Batiment.ZoneClimatique;
	annee_installation: number;
	seer_saisi: number | null;
}) {
	const { zone_climatique, annee_installation, seer_saisi } = props;

	if (seer_saisi && seer_saisi > 0) return seer_saisi * 0.95;

	const abaque = abaques.refroidissement.eer;
	const match = abaque
		.search({ zone_climatique, annee_installation }, abaque.load())
		.at(0);

	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	return match.eer;
}
