import { Text } from "@src/components/text/Text";
import * as S from "./FeatureFlag.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const FeatureFlag = () => {
	return (
		<S.FeatureFlag>
			<Text size="l">
				<T>{lang.featureFlag.title}</T>
			</Text>

			<S.Spacer />
		</S.FeatureFlag>
	);
};
