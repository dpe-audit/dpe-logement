import { abaques } from "@open-dpe-logement/abaques";
import { Ventilation } from "@open-dpe-logement/models";

/**
 * @param props.surface_installation - Surface de l'installation de ventilation en m²
 * @param props.surface_installations - Surface totale des installations de ventilation en m²
 * @returns Ratio de dimensionnement de l'installation de ventilation
 */
export function rdim(props: {
	surface_installation: number;
	surface_installations: number;
}): number {
	const { surface_installation, surface_installations } = props;
	return surface_installation / surface_installations;
}

/**
 * @param props.type_ventilation - Type de ventilation
 * @param props.presence_echangeur_thermique - Présence d'un échangeur thermique
 * @param props.installation_collective - Installation collective ou individuelle
 * @param props.annee_installation - Année d'installation
 *
 * @abaques ventilation.debits
 *
 * @throws {Error} Aucune correspondance dans l'abaque
 *
 * @returns `smea_couv` - Somme des modules d'entrée d'air sous 20 Pa en m3/(h.m²)
 * @returns `qvarep_conv` - Débit volumique conventionnel à reprendre en m3/(h.m²)
 * @returns `qvasouf_conv` - Débit volumique conventionnel à souffler en m3/(h.m²)
 */
export function debits(props: {
	type_ventilation: Ventilation.Installation.TypeVentilation;
	presence_echangeur_thermique: boolean | null;
	installation_collective: boolean | null;
	annee_installation: number | null;
}): {
	smea_conv: number;
	qvarep_conv: number;
	qvasouf_conv: number;
} {
	const abaque = abaques.ventilation.debits;
	const data = abaque.load();
	const match = abaque.search(props, data).at(0);

	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	return {
		smea_conv: match.smea_conv,
		qvarep_conv: match.qvarep_conv,
		qvasouf_conv: match.qvasouf_conv,
	};
}

/**
 * @param props.rdim - Ratio de dimensionnement de l'installation de ventilation
 * @param props.qvarep_conv - Débit volumique conventionnel à reprendre (m3/(h.m²))
 * @param props.sh - Surface habitable (m²)
 * @returns Déperditions thermiques par renouvellement d'air due au système de ventilation (W/K)
 */
export function hvent(props: {
	rdim: number;
	qvarep_conv: number;
	sh: number;
}): number {
	const { rdim, qvarep_conv, sh } = props;
	return 0.34 * qvarep_conv * sh * rdim;
}
