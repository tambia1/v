import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./Shush.styles";

export const Shush = () => {
	return (
		<S.Shush>
			<Text variant="header">
				<T>{lang.shush.title}</T>
			</Text>
		</S.Shush>
	);
};
