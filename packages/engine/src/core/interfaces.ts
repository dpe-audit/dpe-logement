
export interface RuleResultRegistry {
	"enveloppe:mur:u": number;
	"enveloppe:mur:sdep": number;
	"enveloppe:mur:dp": number;
	"enveloppe:pont_thermique:k": number;
}

export interface ResolvedDeps {
	// Surcharge typée — retourne le bon type si l'id est dans le registre
	get<K extends keyof RuleResultRegistry>(idRegle: K): RuleResultRegistry[K];
	// Surcharge générique — fallback pour les règles non encore enregistrées
	get<T = unknown>(idRegle: string): T;
}

export interface Regle {
	readonly id: string;
	readonly dependencies: string[];
	readonly scopes: string[];
}
