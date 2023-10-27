import { useLanguage } from "@src/language/UseLanguage";
import * as S from "./About.styles";
import { Text } from "@src/components/text/Text";

export const About = () => {
	const { lang } = useLanguage();

	return (
		<S.About>
			<Text size="l">{lang.settings.about.text}</Text>
		</S.About>
	);
};
