import { MenuGroup } from "@src/components/menu/Menu";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export type MenuItemId = "dataCenter" | "dataAccess" | "settings" | "reports" | "payments" | "support" | "about";

export const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		text: <T>{lang.redis.menu.data.title}</T>,
		menuItems: [
			{ id: "dataCenter", text: <T>{lang.redis.menu.data.dataCenter}</T> },
			{ id: "dataAccess", text: <T>{lang.redis.menu.data.dataAccess}</T> },
		],
	},
	{
		text: <T>{lang.redis.menu.settings.title}</T>,
		menuItems: [
			{ id: "settings", text: <T>{lang.redis.menu.settings.settings}</T> },
			{ id: "reports", text: <T>{lang.redis.menu.settings.reports}</T> },
			{ id: "payments", text: <T>{lang.redis.menu.settings.payments}</T> },
		],
	},
	{
		text: <T>{lang.redis.menu.about.title}</T>,
		menuItems: [
			{ id: "support", text: <T>{lang.redis.menu.about.support}</T> },
			{ id: "about", text: <T>{lang.redis.menu.about.about}</T> },
		],
	},
];
