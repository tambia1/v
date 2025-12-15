import type { LanguageName } from "../i18n.types";

export type Home = {
	languageName: LanguageName;

	all: {
		yes: string;
		no: string;
		ok: string;
		cancel: string;
		areYouSure: string;
		error: string;
	};

	splash: {
		title: string;
	};

	home: {
		title: string;
		guest: string;
	};

	user: {
		title: string;
		email: string;
		password: string;
		login: string;
		logout: string;
		welcome: string;
		loading: string;
		error: string;
	};

	calculator: {
		title: string;
	};

	camera: {
		title: string;
	};

	nightVision: {
		title: string;
	};

	clock: {
		title: string;
	};

	weather: {
		title: string;
		loading: string;
		error: string;
		location: string;
		temperature: string;
		feelsLike: string;
		humidity: string;
		windSpeed: string;
		pressure: string;
		visibility: string;
		uvIndex: string;
		currentConditions: string;
		hourlyForecast: string;
		locationError: string;
		locationPermissionDenied: string;
	};

	notes: {
		title: string;
		notes: string;
		save: string;
	};

	stocks: {
		title: string;
		exchange: string;
	};

	chat: {
		title: string;
	};

	calendar: {
		title: string;
		today: string;
	};

	store: {
		title: string;
		saveApp: string;
		alreadySaved: string;
	};

	spin: {
		title: string;
		add: string;
		ready: string;
	};

	tetris: {
		title: string;
	};

	snake: {
		title: string;
	};

	ninja: {
		title: string;
	};

	clashRoyale: {
		title: string;
		start: string;
		back: string;
		loading: string;
	};

	speed: {
		title: string;
	};

	chickenScream: {
		title: string;
	};

	chwazi: {
		title: string;
	};

	shush: {
		title: string;
	};

	emojiFace: {
		title: string;
	};

	smileClock: {
		title: string;
	};

	board: {
		title: string;
	};

	mfe1: {
		title: string;
	};

	mfe2: {
		title: string;
	};

	redis: {
		title: string;
		menu: {
			data: {
				title: string;
				dataCenter: string;
				dataAccess: string;
			};
			settings: {
				title: string;
				settings: string;
				reports: string;
				payments: string;
			};
			about: {
				title: string;
				support: string;
				about: string;
			};
		};
		database: {
			title: string;
		};
		subscription: {
			title: string;
		};
		create: {
			title: string;
		};
	};

	featureFlag: {
		title: string;
	};

	test: {
		title: string;
	};

	testShared: {
		title: string;
	};

	testTable: {
		title: string;
	};

	testTransition: {
		title: string;
	};

	testAnimation: {
		title: string;
	};

	testCube: {
		title: string;
	};

	testRedis: {
		title: string;
	};

	testTree: {
		title: string;
	};

	testMenu: {
		title: string;
	};

	testCounter: {
		title: string;
	};

	testAi: {
		title: string;
	};

	testEdit: {
		title: string;
	};
};
