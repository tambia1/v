import { Text } from "@src/components/text/Text";
import * as S from "./TestMenu.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Icon } from "@src/icons/Icon";

export const TestMenu = () => {
	const handleOnCLickMenu = () => {};

	return (
		<S.TestMenu>
			<Text size="l">
				<T>{lang.testMenu.title}</T>
			</Text>

			<Icon iconName="iconMenu" onClick={handleOnCLickMenu} />
		</S.TestMenu>
	);
};
