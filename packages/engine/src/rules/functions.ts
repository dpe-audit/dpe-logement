import { Common } from "@open-dpe-logement/models";
import { abaques } from "@open-dpe-logement/abaques";

/**
 * @see Arrêté 15 septembre 2006 – Annexe 4
 * @param props.cef - Consommation d'énergie finale en kWh
 * @param props.energie - Type d'énergie consommée
 * @return Consommation d'énergie primaire en kWh
 */
export function calcule_cep(props: {
	cef: number;
	energie: Common.Energie;
}): number {
	const { cef, energie } = props;
	switch (energie) {
		case Common.EnergieEnum.electricite:
			return cef * 1.9;
		default:
			return cef;
	}
}

/**
 * @see Arrêté 15 septembre 2006 – Annexe 4
 * @param props.cef - Consommation d'énergie finale en kWh
 * @param props.usage - Usage de l'énergie consommée
 * @param props.energie - Type d'énergie consommée
 * @param props.reseau_id - ID du réseau de chaleur ou de froid (optionnel)
 * @return Emissions de gaz à effet de serre en kgCO2eq
 */
export function calcule_eges(props: {
	cef: number;
	usage: Common.Usage;
	energie: Common.Energie;
	reseau_id?: string | null;
}): number {
	const { cef, usage, energie, reseau_id } = props;

	// Cas des réseaux de chaleur ou de froid : on utilise le contenu en CO2 ACV du réseau
	if (reseau_id) {
		const abaque = abaques.performance.reseau.load();
		const query = { id: reseau_id };
		const matches = abaques.performance.reseau.search(query, abaque);
		const reseau = matches.at(0) ?? null;

		if (reseau) {
			return cef * reseau.contenu_co2_acv;
		}
	}

	// Cas de l'électricité
	if (energie === Common.EnergieEnum.electricite) {
		switch (usage) {
			case Common.UsageEnum.chauffage:
				return cef * 0.079;
			case Common.UsageEnum.ecs:
				return cef * 0.065;
			case Common.UsageEnum.refroidissement:
				return cef * 0.064;
			case Common.UsageEnum.eclairage:
				return cef * 0.069;
			case Common.UsageEnum.auxiliaire:
				return cef * 0.069;
		}
	}

	switch (energie) {
		case Common.EnergieEnum.electricite_renouvelable:
			return cef * 0;
		case Common.EnergieEnum.gaz_naturel:
			return cef * 0.227;
		case Common.EnergieEnum.gpl:
			return cef * 0.272;
		case Common.EnergieEnum.fioul:
			return cef * 0.324;
		case Common.EnergieEnum.charbon:
			return cef * 0.385;
		case Common.EnergieEnum.bois_buche:
			return cef * 0.03;
		case Common.EnergieEnum.bois_plaquette:
			return cef * 0.024;
		case Common.EnergieEnum.bois_granule:
			return cef * 0.03;
		case Common.EnergieEnum.reseau_chaleur:
			return cef * 0.385;
		case Common.EnergieEnum.reseau_froid:
			return cef * 0.385;
	}
}
