import { version } from "@src/../package.json";
import { Text } from "@src/components/text/Text";
import * as S from "./About.styles";

export const About = () => {
	return (
		<S.About>
			<Text variant="header">About</Text>

			<S.Spacer />
			<Text variant="body">App Version: {version}</Text>
		</S.About>
	);
};
