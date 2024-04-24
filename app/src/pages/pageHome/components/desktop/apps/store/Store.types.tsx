export type IStore = {
	name: string;
	apps: IApp[];
};

export type IApp = {
	name: string;
	url: string;
	icon: string;
};
