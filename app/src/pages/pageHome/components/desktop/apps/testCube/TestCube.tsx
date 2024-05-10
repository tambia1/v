import { Text } from "@src/components/text/Text";
import * as S from "./TestCude.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const TestCube = () => {
	return (
		<S.TestCube>
			<Text size="l">
				<T>{lang.testCube.title}</T>
			</Text>
		</S.TestCube>
	);
};
