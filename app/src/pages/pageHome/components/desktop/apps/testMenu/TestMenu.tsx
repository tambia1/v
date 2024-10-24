import { type MenuGroup, SideMenu } from "@src/components/sideMenu/SideMenu";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import * as S from "./TestMenu.styles";

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
			<Text fontSize="header">
				<T>{lang.testMenu.title}</T>
			</Text>

			<S.Spacer />

			<S.MenuIcon iconName="iconMenu" onClick={handleOnClickMenuBackground} />

			<SideMenu
				$visible={isMenuVisible}
				menuGroups={menuGroups}
				selectedMenuId="add"
				onClickBackground={handleOnClickMenuBackground}
				onClickItem={handleOnClickMenuItem}
			/>
		</S.TestMenu>
	);
};
