export const Locations = {
	miami: {
		name: "Miami",
		lng: -80.23621830872433,
		lat: 25.822112091825236,
	},
	newYork: {
		name: "New\nYork",
		lng: -73.935242,
		lat: 40.73061,
	},
	london: {
		name: "London",
		lng: -0.118092,
		lat: 51.509865,
	},
	telAviv: {
		name: "Tel\nAviv",
		lng: 35.217018,
		lat: 31.771959,
	},
	sydney: {
		name: "Sydney",
		lng: 151.10632004454698,
		lat: -33.92060175979464,
	},
	tokyo: {
		name: "Tokyo",
		lng: 139.77993777728716,
		lat: 35.67743872951423,
	},
} as const;

export type ILocation = keyof typeof Locations;
