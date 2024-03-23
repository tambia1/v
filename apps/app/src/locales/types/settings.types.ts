export type ISettings = {
	settings: {
		title: string;
		apearance: string;
		language: {
			title: string;
			save: string;
			english: string;
			finnish: string;
		};
		theme: {
			title: string;
			mode: string;
			light: string;
			dark: string;
			background: string;
			noBackground: string;
		};
		layout: {
			title: string;
			barPositon: string;
			top: string;
			bottom: string;
			left: string;
			right: string;
		};
		store: string;
		about: {
			title: string;
			text: string;
		};
	};
};
