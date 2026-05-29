import { Chauffage, Common } from "@open-dpe-logement/models";

export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Données par taux de charge
 */
export function createParTauxCharge<T>(
	fn: (x: Chauffage.TauxCharge) => T,
): Chauffage.ParTauxCharge<T> {
	const result: Partial<Chauffage.ParTauxCharge<T>> = {};
	for (const x of Chauffage.TAUX_CHARGE) result[x] = fn(x);
	return result as Chauffage.ParTauxCharge<T>;
}

/**
 * Fonction pour créer une collection de valeurs pour chaque mois de l'année.
 */
export function createParMois<T>(
	fn: (mois: Common.Mois) => T,
): Record<Common.Mois, T> {
	const result = {} as Record<Common.Mois, T>;
	for (const mois of Common.MOIS) {
		result[mois] = fn(mois);
	}
	return result;
}

/**
 * Fusionne plusieurs collections de valeurs par mois en une seule collection, en sommant les valeurs pour chaque mois.
 */
export function mergeParMois(
	values: Common.ParMois<number>[],
): Common.ParMois<number> {
	const result = createParMois<number>(() => 0);
	for (const item of values) {
		for (const mois of Common.MOIS) result[mois] += item[mois];
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

export function createParMoisFrom<T extends object>(
	values: Array<T & { mois: string | Common.Mois }>,
): Common.ParMois<T> {
	const map = new Map(values.map((item) => [item.mois as Common.Mois, item]));
	const result: Partial<Common.ParMois<T>> = {};

	for (const mois of Common.MOIS) {
		const match = map.get(mois);

		if (!match) {
			const message = `Valeur mensuelle manquante pour le mois ${mois} : ${JSON.stringify(values)}`;
			throw new Error(message);
		}
		result[mois] = match;
	}
	return result as Common.ParMois<T>;
}

export function containsAllMois<T extends object>(
	values: Array<T & { mois: string | Common.Mois }>,
): boolean {
	const moisSet = new Set(values.map((item) => item.mois));
	return Common.MOIS.every((mois) => moisSet.has(mois));
}

export function mapParMois<T, U>(
	parMois: Common.ParMois<T>,
	fn: (value: T) => U,
): Common.ParMois<U> {
	return Object.fromEntries(
		Common.MOIS.map((mois) => [mois, fn(parMois[mois])]),
	) as Common.ParMois<U>;
}
