import { Pages } from "@pages/Pages.types";
import { content } from "@src/locale/en";
import { ItemType as MenuItemType } from "./components/pageMenu/PageMenu";
import { ScreenAbout } from "./screens/screenAbout/ScreenAbout";
import { ScreenDataCenter } from "./screens/screenDataCenter/ScreenDataCenter";
import { ScreenThemes } from "./screens/screenThemes/ScreenThemes";

export type PageKey = typeof Pages.home.dataCenter | typeof Pages.home.themes | typeof Pages.home.about;

export interface PageValue {
	menuItem: MenuItemType;
	pageHeader: string;
	pageScreen: React.ReactElement;
}

export const PageItem: { [key in PageKey]: PageValue } = {
	"/home/dataCenter": {
		menuItem: "dataCenter",
		pageHeader: content.screenDataCenter.title,
		pageScreen: <ScreenDataCenter />,
	},
	"/home/themes": {
		menuItem: "themes",
		pageHeader: content.screenThemes.title,
		pageScreen: <ScreenThemes />,
	},
	"/home/about": {
		menuItem: "about",
		pageHeader: content.screenAbout.title,
		pageScreen: <ScreenAbout />,
	},
} as const;
