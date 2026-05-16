export const MoisEnum = {
	janvier: "01",
	fevrier: "02",
	mars: "03",
	avril: "04",
	mai: "05",
	juin: "06",
	juillet: "07",
	aout: "08",
	septembre: "09",
	octobre: "10",
	novembre: "11",
	decembre: "12",
} as const;

export type Mois = (typeof MoisEnum)[keyof typeof MoisEnum];

export const ScenarioEnum = {
	conventionnel: "conventionnel",
	depensier: "depensier",
} as const;

export type Scenario = (typeof ScenarioEnum)[keyof typeof ScenarioEnum];
