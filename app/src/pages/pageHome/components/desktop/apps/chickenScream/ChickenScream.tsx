import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";

export const ChickenScream = () => {
	return (
		<S.ChickenScream>
			<Text size="l">
				<T>{lang.test.title}</T>
			</Text>

			<S.Spacer />

			<Chicken state="jump" />
		</S.ChickenScream>
	);
};
