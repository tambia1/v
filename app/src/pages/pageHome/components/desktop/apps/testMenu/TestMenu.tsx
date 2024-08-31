import { Text } from "@src/components/text/Text";
import * as S from "./TestMenu.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { Menu, MenuGroup } from "@src/components/menu/Menu";

export const TestMenu = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const menuGroups: MenuGroup[] = [
		{
			text: "CRUD",
			menuItems: [
				{ id: "add", text: "Add", onClick: () => {} },
				{ id: "remove", text: "Remove", onClick: () => {} },
				{ id: "update", text: "Update", onClick: () => {} },
			],
		},
		{
			text: "Settings",
			menuItems: [{ id: "about", text: "About", onClick: () => {} }],
		},
	];

	const handleOnClickMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	return (
		<S.TestMenu>
			<Text size="l">
				<T>{lang.testMenu.title}</T>
			</Text>

			<S.Spacer />

			<S.MenuIcon iconName="iconMenu" onClick={handleOnClickMenu} />

			<Menu visible={isMenuVisible} menuGroups={menuGroups} onClickBackground={handleOnClickMenu} />
		</S.TestMenu>
	);
};
