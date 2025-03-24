import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./EmojiFace.styles";

export const EmojiFace = () => {
	return (
		<S.EmojiFace>
			<Text variant="header">
				<T>{lang.emojiFace.title}</T>
			</Text>

			<S.Spacer />
		</S.EmojiFace>
	);
};
