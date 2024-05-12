import { Text } from "@src/components/text/Text";
import * as S from "./TestRedis.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const TestRedis = () => {
	return (
		<S.TestRedis>
			<Text size="l">
				<T>{lang.testRedis.title}</T>
			</Text>
		</S.TestRedis>
	);
};
