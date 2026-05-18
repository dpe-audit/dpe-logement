import { abaques } from "@open-dpe-logement/abaques";
import { Common, Batiment, Enveloppe } from "@open-dpe-logement/models";

/**
 * @params props.code_departement - Code département du bâtiment
 * @returns Zone climatique du bâtiment
 */
export function zone_climatique(props: {
	code_departement: string;
}): Batiment.ZoneClimatique {
	const abaque = abaques.climat.zoneClimatique;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	return match.zone_climatique as Batiment.ZoneClimatique;
}

/**
 * @param props.zone_climatique - Zone climatique du bâtiment
 * @returns Température extérieure de base en °C
 */
export function tbase(props: {
	zone_climatique: Batiment.ZoneClimatique;
}): number {
	const abaque = abaques.climat.tbase;
	const match = abaque.search(props, abaque.load()).at(0);
	if (!match) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	return match.tbase;
}

type Sollitiations = {
epv: number;
	e: number;
	efr26: number;
	efr28: number;
	nref19: number | null;
	nref21: number | null;
	nref26: number;
	nref28: number;
	dh14: number;
	dh19: number | null;
	dh21: number | null;
	dh26: number;
	dh28: number;
	text: number | null;
	tefs: number | null;
	textmoy_clim26: number | null;
	textmoy_clim28: number | null;
}

export function sollicitations(props: {
	zone_climatique: Batiment.ZoneClimatique;
	altitude: number;
	parois_anciennes: boolean;
	inertie: Enveloppe.Common.Inertie;
}): Common.ParMois<Sollitiations> {
	const abaque = abaques.climat.sollicitations;
	const matches = abaque.search(props, abaque.load());
  const sollicitations: Partial<Common.ParMois<Sollitiations>> = {};

	if (!matches || matches.length === 0) {
		const message = `Aucune valeur forfaitaire trouvée pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
	if (matches.length !== 12) {
		const message = `Nombre de valeurs forfaitaires incorrect pour : ${JSON.stringify(props)}`;
		throw new Error(message);
	}
  for (const mois of Common.MOIS) {
    const match = matches.find((match) => match.mois === mois);
    if (!match) {
      const message = `Aucune valeur forfaitaire trouvée pour le mois ${mois} avec les propriétés : ${JSON.stringify(props)}`;
      throw new Error(message);
    }
    sollicitations[mois] = match;
  }
  return sollicitations as Common.ParMois<Sollitiations>;
}
