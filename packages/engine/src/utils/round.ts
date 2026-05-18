/**
 * Arrondi un nombre à une précision définie
 */
export function round(value: number): number;
export function round(value: null): null;
export function round(value: number | null): number | null {
	if (value === null) return null;
	return parseFloat(value.toFixed(2));
}
