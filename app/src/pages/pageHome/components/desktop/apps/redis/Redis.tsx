import { Text } from "@src/components/text/Text";
import * as S from "./Redis.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Redis = () => {
	return (
		<S.Redis>
			<Text size="l">
				<T>{lang.redis.title}</T>
			</Text>

			<S.Spacer />
		</S.Redis>
	);
};
