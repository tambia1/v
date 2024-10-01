import { Text } from "@src/components/text/Text";
import * as S from "./TestMenu.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { Menu, MenuGroup } from "@src/components/menu/Menu";

type MenuItemId = "add" | "remove" | "update" | "about";

const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		content: "CRUD",
		menuItems: [
			{ id: "add", content: "Add" },
			{ id: "remove", content: "Remove" },
			{ id: "update", content: "Update" },
		],
	},
	{
		content: "Settings",
		menuItems: [{ id: "about", content: "About" }],
	},
];

export const TestMenu = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const handleOnClickMenuBackground = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	const handleOnClickMenuItem = (_id: string) => {
		setIsMenuVisible(!isMenuVisible);
	};

	return (
		<S.TestMenu>
			<Text size="l">
				<T>{lang.testMenu.title}</T>
			</Text>

			<S.Spacer />

			<S.MenuIcon iconName="iconMenu" onClick={handleOnClickMenuBackground} />

			<Menu $visible={isMenuVisible} menuGroups={menuGroups} selectedMenuId="add" onClickBackground={handleOnClickMenuBackground} onClickItem={handleOnClickMenuItem} />
		</S.TestMenu>
	);
};
