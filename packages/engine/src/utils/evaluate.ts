import * as math from "mathjs";

/**
 * Évalue une expression mathématique
 */
export const evaluate = (
	expr: string,
	scope?: Record<string, number>,
): number => {
	return math.evaluate(expr, scope);
};
