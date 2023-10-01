import { Icon } from "../components/appButton/AppButton.styles";

interface IApp {
	id: AppId;
	title: string;
	icon: Icon;
}

export type AppId = "settings" | "calculator" | "camera" | "notes";

export const apps: IApp[] = [
	{ id: "settings", title: "Settings", icon: "settings" },
	{ id: "calculator", title: "Calculator", icon: "calculator" },
	{ id: "camera", title: "Camera", icon: "camera" },
	{ id: "notes", title: "Notes", icon: "notes" },
];
