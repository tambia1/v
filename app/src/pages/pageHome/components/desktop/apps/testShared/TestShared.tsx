import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Button } from "@v/shared-ui";
import * as S from "./TestShared.styles";

export const TestShared = () => {
	return (
		<S.TestShared>
			<Text variant="header">
				<T>{lang.testShared.title}</T>
			</Text>

			<S.Spacer />

			<Button varian="full">Shared Button</Button>
		</S.TestShared>
	);
};
