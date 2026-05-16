export interface Regle {
  readonly id: string;
  readonly dependencies: string[];
}

export interface RegleIterable extends Regle {
  readonly scope: string; // chemin dans Dpe ex: "murs", "baies"
}
