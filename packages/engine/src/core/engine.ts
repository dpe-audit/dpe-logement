export const ScenarioEnum = {
	conventionnel: "conventionnel",
	depensier: "depensier",
} as const;

export type Scenario = (typeof ScenarioEnum)[keyof typeof ScenarioEnum];

export class Engine {
	private scenario: Scenario = ScenarioEnum.conventionnel;

	public setScenario(scenario: Scenario): Engine {
		if (scenario !== this.scenario) {
			// Tasks:
			// - Réinitialisation du cache

			this.scenario = scenario;
		}
		return this;
	}
}
