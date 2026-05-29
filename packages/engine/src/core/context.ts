import { Common, Diagnostic } from "@open-dpe-logement/models";
import type { Results } from "./results.js";

export type Thunk<T> = () => T;

export interface Context {
	readonly diagnostic: Diagnostic.Diagnostic;
	readonly scenario: Common.Scenario;

	register<K extends keyof Results, V extends keyof Results[K]>(
		key: K,
		value: V,
		thunk: Thunk<Results[K][V]>,
	): void;

	registerEach<
		K extends keyof Results,
		V extends keyof Results[K],
		T extends { id: string },
	>(
		key: K,
		value: V,
		items: T[],
		thunk: (item: T) => Results[K][V],
	): void;

	resolve<K extends keyof Results, V extends keyof Results[K]>(
		key: K,
		value: V,
	): Results[K][V];

	resolveOne<K extends keyof Results, V extends keyof Results[K], I extends { id: string }>(
		key: K,
		value: V,
		item: I,
	): Results[K] extends Record<I["id"], infer T> &  ? T[V] : never];

	resolveEach<K extends keyof Results>(
		key: K,
		items: Array<{ id: string }>,
	): Array<Results[K] extends Record<string, infer V> ? V : never>;

	getResults(): Results;
}

function register<K extends keyof Results, V extends keyof Results[K]>(
	key: K,
	value: V,
	thunk: Thunk<Results[K][V]>,
): void {}

register("ventilation", "caux", () => 0);
