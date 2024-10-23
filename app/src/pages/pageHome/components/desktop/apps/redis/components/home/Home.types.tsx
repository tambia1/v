import { Icon } from "@src/components/icon/Icon";
import type { MenuGroup } from "@src/components/menu/Menu";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export type MenuItemId = "dataCenter" | "dataAccess" | "settings" | "reports" | "payments" | "support" | "about";

export const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		content: <T>{lang.redis.menu.data.title}</T>,
		menuItems: [
			{
				id: "dataCenter",
				content: (
					<>
						<Icon iconName="iconDatabase" />
						<T>{lang.redis.menu.data.dataCenter}</T>
					</>
				),
			},
			{
				id: "dataAccess",
				content: (
					<>
						<Icon iconName="iconUser" />
						<T>{lang.redis.menu.data.dataAccess}</T>
					</>
				),
			},
		],
	},
	{
		content: <T>{lang.redis.menu.settings.title}</T>,
		menuItems: [
			{
				id: "settings",
				content: (
					<>
						<Icon iconName="iconSettings" />
						<T>{lang.redis.menu.settings.settings}</T>
					</>
				),
			},
			{
				id: "reports",
				content: (
					<>
						<Icon iconName="iconBook" />
						<T>{lang.redis.menu.settings.reports}</T>
					</>
				),
			},
			{
				id: "payments",
				content: (
					<>
						<Icon iconName="iconDollarSign" />
						<T>{lang.redis.menu.settings.payments}</T>
					</>
				),
			},
		],
	},
	{
		content: <T>{lang.redis.menu.about.title}</T>,
		menuItems: [
			{
				id: "support",
				content: (
					<>
						<Icon iconName="iconHelpCircle" />
						<T>{lang.redis.menu.about.support}</T>
					</>
				),
			},
			{
				id: "about",
				content: (
					<>
						<Icon iconName="iconRedisDissolved" />
						<T>{lang.redis.menu.about.about}</T>
					</>
				),
			},
		],
	},
];
