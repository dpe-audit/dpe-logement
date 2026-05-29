import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment, Enveloppe } from "@open-dpe-logement/models";
import * as EnveloppRule from "#rules/enveloppe/functions.js";
import { ValeurForfaitaireError } from "#utils/errors.js";
import { createParMoisFrom, mapParMois } from "#utils/helpers.js";

/**
 * @param props.code_departement - Code département du bâtiment
 * @see abaques.climat.zoneClimatique
 * @throws {ValeurForfaitaireError}
 * @returns Zone climatique du bâtiment
 */
export function calcule_zone_climatique(props: {
	code_departement: string;
}): Batiment.ZoneClimatique {
	const abaque = abaques.climat.zoneClimatique;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.zone_climatique as Batiment.ZoneClimatique;
}

/**
 * @param props.zone_climatique - {@linkcode calcule_zone_climatique}
 * @see abaques.climat.tbase
 * @throws {ValeurForfaitaireError}
 * @returns Température extérieure de base en °C
 */
export function calcule_tbase(props: {
	zone_climatique: Batiment.ZoneClimatique;
}): number {
	const abaque = abaques.climat.tbase;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) throw new ValeurForfaitaireError(props);
	return match.tbase;
}

export type Sollicitations = Common.ParMois<{
	/** Température moyenne d'eau froide sanitaire en °C */
	tefs: number | null;
	/** Ensoleillement reçu en période de chauffage en kWh/m² */
	e: number;
	/** Ensoleillement reçu en période de refroidissement pour une température de consigne de 26°C en kWh/m² */
	efr26: number;
	/** Ensoleillement reçu en période de refroidissement pour une température de consigne de 28°C en kWh/m² */
	efr28: number;
	/** Température extérieure moyenne en °C */
	text: number | null;
	/** Température extérieure moyenne pour une température de consigne de 26°C en °C */
	textmoy26: number | null;
	/** Température extérieure moyenne pour une température de consigne de 28°C en °C */
	textmoy28: number | null;
	/** Nombre d'heures de chauffage pour une température de consigne à 19°C */
	nref19: number;
	/** Nombre d'heures de chauffage pour une température de consigne à 21°C */
	nref21: number;
	/** Nombre d'heures de refroidissement pour une température de consigne à 26°C */
	nref26: number;
	/** Nombre d'heures de refroidissement pour une température de consigne à 28°C */
	nref28: number;
	/** Degrés heures de base 14 sur la saison de chauffe complète en °C·h */
	dh14: number;
	/** Degrés-heure pour une température de consigne de 19°C en °C·h */
	dh19: number;
	/** Degrés-heure pour une température de consigne de 21°C en °C·h */
	dh21: number;
	/** Degrés-heure pour une température de consigne de 26°C en °C·h */
	dh26: number;
	/** Degrés-heure pour une température de consigne de 28°C en °C·h */
	dh28: number;
}>;

/**
 * @param props.zone_climatique - {@linkcode calcule_zone_climatique}
 * @param props.altitude - Altitude du bâtiment en mètres
 * @param props.parois_anciennes - {@linkcode calcule_parois_anciennes}
 * @param props.inertie - {@linkcode EnveloppRule.calcule_inertie}
 * @returns Sollicitations climatiques pour chaque mois de l'année
 */
export function calcule_sollicitations(props: {
	zone_climatique: Batiment.ZoneClimatique;
	altitude: number;
	parois_anciennes: boolean;
	inertie: Enveloppe.Common.Inertie;
}): Sollicitations {
	const abaque = abaques.climat.sollicitations;
	const matches = abaque.search(props, abaque.load());
	return createParMoisFrom(matches);
}

/**
 * @param props.zone_climatique - {@linkcode calcule_zone_climatique}
 * @param props.orientation - Orientation de la paroi
 * @param props.inclinaison - Inclinaison de la paroi en degrés
 * @returns Coefficients d'orientation et d'inclinaison des parois vitrées pour chaque mois de l'année
 */
export function calcule_c1(props: {
	zone_climatique: Batiment.ZoneClimatique;
	orientation: Enveloppe.Common.Orientation;
	inclinaison: number;
}): Common.ParMois<number> {
	const abaque = abaques.climat.c1;
	const matches = abaque.search(props, abaque.load());
	return mapParMois(createParMoisFrom(matches), (value) => value.c1);
}

/**
 * @see abaques.climat.nj
 * @returns Nombre de jours pour chaque mois de l'année
 */
export function calcule_nj(): Common.ParMois<number> {
	return {
		[Common.MoisEnum["01"]]: 31,
		[Common.MoisEnum["02"]]: 28,
		[Common.MoisEnum["03"]]: 31,
		[Common.MoisEnum["04"]]: 30,
		[Common.MoisEnum["05"]]: 31,
		[Common.MoisEnum["06"]]: 30,
		[Common.MoisEnum["07"]]: 31,
		[Common.MoisEnum["08"]]: 31,
		[Common.MoisEnum["09"]]: 30,
		[Common.MoisEnum["10"]]: 31,
		[Common.MoisEnum["11"]]: 30,
		[Common.MoisEnum["12"]]: 24,
	};
}

/**
 * @param props.parois - Liste des parois de l'enveloppe
 * @param props.parois[].surface - Surface de la paroi en m²
 * @param props.parois[].materiaux_anciens - Indique si les matériaux de la paroi sont anciens ou non (non par défaut)
 * @returns Présence majoritaire de parois anciennes (plus de 50% de la surface totale des parois)
 */
export function calcule_parois_anciennes(props: {
	parois: { surface: number; materiaux_anciens: boolean | null }[];
}): boolean {
	const s = props.parois.reduce((acc, paroi) => acc + paroi.surface, 0);
	const w = props.parois.reduce(
		(acc, paroi) => acc + (paroi.materiaux_anciens ? paroi.surface : 0),
		0,
	);
	if (s === 0) return false;
	return s === 0 ? false : w / s > 0.5;
}
