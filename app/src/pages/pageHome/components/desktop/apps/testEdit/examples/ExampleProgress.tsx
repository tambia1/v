import { Progress } from "@src/components/progress/Progress";
import { Text } from "@src/components/text/Text";
import * as S from "../TestEdit.styles";

export const ExampleProgress = () => {
	return (
		<S.Col>
			<Text>Progress</Text>
			<Progress percent={75} />
		</S.Col>
	);
};
