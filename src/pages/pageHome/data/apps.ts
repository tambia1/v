import { Icon } from "../components/applications/components/applicationButton/ApplicationButton.styles";

interface IApp {
	id: IAppId;
	title: string;
	icon: Icon;
}

export type IAppId = "settings" | "calculator" | "camera" | "notes";

export const apps: IApp[] = [
	{ id: "settings", title: "Settings", icon: "settings" },
	{ id: "calculator", title: "Calculator", icon: "calculator" },
	{ id: "camera", title: "Camera", icon: "camera" },
	{ id: "notes", title: "Notes", icon: "notes" },
];
