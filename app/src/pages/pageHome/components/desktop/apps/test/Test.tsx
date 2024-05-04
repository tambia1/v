import { Text } from "@src/components/text/Text";
import * as S from "./Test.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Test = () => {
	return (
		<S.Test>
			<Text size="l">
				<T>{lang.test.title}</T>
			</Text>
		</S.Test>
	);
};
