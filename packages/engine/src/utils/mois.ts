import { Common } from "@open-dpe-logement/models";

/**
 * Fonction pour créer une collection de valeurs pour chaque mois de l'année.
 */
export function createParMois<T>(
	fn: (props: { mois: Common.Mois }) => T,
): Record<Common.Mois, T> {
	const result = {} as Record<Common.Mois, T>;
	for (const mois of Common.MOIS) {
		result[mois] = fn({ mois });
	}
	return result;
}

/**
 * Fonction pour réduire une collection de valeurs par mois en une seule valeur
 */
export function reduceParMois(
	values: Common.ParMois<number>,
	reducer: (acc: number, value: number) => number = (acc, val) => acc + val,
	initial: number = 0,
): number {
	return Object.values(values).reduce(reducer, initial);
}
