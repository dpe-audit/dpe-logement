import { abaques } from "@open-dpe-logement/abaques";
import { Common } from "@open-dpe-logement/models";

/**
 * @params props.surface - Surface du panneau photovoltaïque en m²
 * @params props.epv - Ensoleillement potentiel pour le mois en kWh/m²
 * @params props.kpv - Coefficient de pondération prenant en compte l'altération par rapport à l'orientation optimale du panneau photovoltaïque
 * @returns Production du panneau photovoltaïque pour le mois en kWh
 */
export function ppv(props: {
	surface: number;
	epv: number;
	kpv: number;
}): number {
	const { surface, epv, kpv } = props;
	return kpv * surface * 0.17 * epv * 0.86;
}

/**
 * @params props.surface - Surface du panneau photovoltaïque en m²
 * @params props.modules - Nombre de modules photovoltaïques
 * @returns Surface du panneau photovoltaïque en m²
 */
export function spv(props: {
	surface: number | null;
	modules: number;
}): number {
	const { surface, modules } = props;
	return surface ? surface * modules : 1.6 * modules;
}

/**
 * @params props.orientation - Orientation du panneau photovoltaïque
 * @params props.inclinaison - Inclinaison du panneau photovoltaïque en degrés
 * @abaques production.kpv
 * @throws {Error} Si aucune valeur forfaitaire n'est trouvée pour les propriétés données
 * @returns Coefficient de pondération prenant en compte l'altération par rapport à l'orientation optimale du panneau photovoltaïque
 */
export function kpv(props: {
	orientation: Common.Orientation;
	inclinaison: number;
}): number {
	const { orientation, inclinaison } = props;
	const abaque = abaques.production.kpv;
	const match = abaque
		.search({ orientation, inclinaison }, abaque.load())
		.at(0);

	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	return match.kpv;
}
