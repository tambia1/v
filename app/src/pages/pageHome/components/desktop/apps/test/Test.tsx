import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./Test.styles";

export const Test = () => {
	return (
		<S.Test>
			<Text fontSize="header">
				<T>{lang.test.title}</T>
			</Text>

			<S.Spacer />
		</S.Test>
	);
};
