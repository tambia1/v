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
		bar: {
			title: string;
			top: string;
			bottom: string;
			left: string;
			right: string;
		};
		about: {
			title: string;
			text: string;
		};
	};
};
