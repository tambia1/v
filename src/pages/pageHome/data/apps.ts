import { Icon } from "../components/App/App.styles";

interface IApp {
	name: string;
	title: string;
	icon: Icon;
}

export const apps: IApp[] = [
	{ name: "settings", title: "Settings", icon: "settings" },
	{ name: "calculator", title: "Calculator", icon: "calculator" },
];
