import { ILanguageName } from "../i18n.types";

export type IHome = {
	languageName: ILanguageName;

	misc: {
		yes: string;
		no: string;
		ok: string;
		cancel: string;
		areYouSure: string;
	};

	splash: {
		title: string;
	};

	home: {
		title: string;
	};

	login: {
		title: string;
		email: string;
		password: string;
		buttonLogin: string;
		buttonLogout: string;
	};

	logout: {
		title: string;
	};

	calculator: {
		title: string;
	};

	camera: {
		title: string;
	};

	clock: {
		title: string;
	};

	notes: {
		title: string;
		notes: string;
	};

	tetris: {
		title: string;
	};

	clashRoyale: {
		title: string;
		start: string;
		back: string;
		loading: string;
	};

	test: {
		title: string;
	};

	testDropDown: {
		title: string;
		item0: string;
		item1: string;
		item2: string;
		item3: string;
		item4: string;
	};

	testTable: {
		title: string;
	};
};
