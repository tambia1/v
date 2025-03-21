export type Store = {
	name: string;
	apps: App[];
};

export type App = {
	name: string;
	url: string;
	icon: string;
};
