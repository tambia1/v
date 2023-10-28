import { useLanguage } from "@src/language/UseLanguage";
import * as S from "./About.styles";
import { Text } from "@src/components/text/Text";

export const About = () => {
	const { language } = useLanguage();

	return (
		<S.About>
			<Text size="l">{language.settings.about.text}</Text>
		</S.About>
	);
};
