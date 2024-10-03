import { version } from "@src/../package.json";
import { Text } from "@src/components/text/Text";
import * as S from "./About.styles";

export const About = () => {
	return (
		<S.About>
			<Text size="l">About</Text>

			<S.Spacer />
			<Text size="m">App Version: {version}</Text>
		</S.About>
	);
};
