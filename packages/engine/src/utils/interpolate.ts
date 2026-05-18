/**
 * Interpolation linéaire / extrapolation
 */
export const linearInterpolate = (
	x: number,
	points: { x: number; y: number }[],
): number => {
	const match = points.find((point) => point.x === x);
	if (match) return match.y;

	if (points.length < 2) {
		throw new Error("La liste des points doivent contenir deux valeurs.");
	}
	const sorted = points.sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x));
	const [p0, p1] = sorted;
	const [x0, x1] = p0!.x < p1!.x ? [p0!.x, p1!.x] : [p1!.x, p0!.x];
	const [y0, y1] = p0!.x < p1!.x ? [p0!.y, p1!.y] : [p1!.y, p0!.y];

	if (x1 === x0) {
		throw new Error(
			"Deux points ont la même valeur de x, impossible d'effectuer l'interpolation.",
		);
	}
	return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
};

/**
 * Interpolation et extrapolation bilinéaire
 */
export const bilinearInterpolate = (
	x: number,
	y: number,
	points: { x: number; y: number; q: number }[],
): number => {
	const match = points.find((point) => point.x === x && point.y === y);
	if (match) return match.q;

	if (points.length < 4) {
		throw new Error("La liste des points doivent contenir quatre valeurs.");
	}
	const xs = [...new Set(points.map((p) => p.x))]
		.sort((a, b) => Math.abs(a - x) - Math.abs(b - x))
		.slice(0, 2);
	const ys = [...new Set(points.map((p) => p.y))]
		.sort((a, b) => Math.abs(a - y) - Math.abs(b - y))
		.slice(0, 2);

	const sorted = points.filter((p) => xs.includes(p.x) && ys.includes(p.y));
	const [p1, p2] = sorted;
	const [x1, x2] = p1!.x < p2!.x ? [p1!.x, p2!.x] : [p2!.x, p1!.x];
	const [y1, y2] = p1!.x < p2!.x ? [p1!.y, p2!.y] : [p2!.y, p1!.y];
	const q11 = sorted.find((p) => p.x === x1 && p.y === y1)!.q;
	const q21 = sorted.find((p) => p.x === x2 && p.y === y1)!.q;
	const q12 = sorted.find((p) => p.x === x1 && p.y === y2)!.q;
	const q22 = sorted.find((p) => p.x === x2 && p.y === y2)!.q;

	let q = (((x2 - x) * (y2 - y)) / ((x2 - x1) * (y2 - y1))) * q11;
	q += (((x - x1) * (y2 - y)) / ((x2 - x1) * (y2 - y1))) * q21;
	q += (((x2 - x) * (y - y1)) / ((x2 - x1) * (y2 - y1))) * q12;
	q += (((x - x1) * (y - y1)) / ((x2 - x1) * (y2 - y1))) * q22;
	return q;
};
