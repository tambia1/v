import { Text } from "@src/components/text/Text";
import * as S from "./TestMenu.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";
import { Menu } from "@src/components/menu/Menu";

export const TestMenu = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const handleOnClickMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	return (
		<S.TestMenu>
			<Text size="l">
				<T>{lang.testMenu.title}</T>
			</Text>

			<S.Spacer />

			<Icon iconName="iconMenu" onClick={handleOnClickMenu} />

			<Menu visible={isMenuVisible} />
		</S.TestMenu>
	);
};
