import { Text } from "@src/components/text/Text";
import * as S from "./TestMenu.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { Menu, MenuGroup } from "@src/components/menu/Menu";

type MenuItemId = "add" | "remove" | "update" | "about";

const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		text: "CRUD",
		menuItems: [
			{ id: "add", text: "Add" },
			{ id: "remove", text: "Remove" },
			{ id: "update", text: "Update" },
		],
	},
	{
		text: "Settings",
		menuItems: [{ id: "about", text: "About" }],
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

			<Menu visible={isMenuVisible} menuGroups={menuGroups} onClickBackground={handleOnClickMenuBackground} onClickItem={handleOnClickMenuItem} />
		</S.TestMenu>
	);
};
