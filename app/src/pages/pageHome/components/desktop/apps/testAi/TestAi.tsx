import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import * as S from "./TestAi.styles";

export const TestAi = () => {
	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				<Text variant="body">This is the TestAi app - a simple test application for AI functionality.</Text>
			</S.Col>
		</S.TestAi>
	);
};
