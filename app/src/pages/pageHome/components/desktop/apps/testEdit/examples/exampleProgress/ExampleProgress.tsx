import { Progress } from "@src/components/progress/Progress";
import { Text } from "@src/components/text/Text";
import * as S from "../../TestEdit.styles";

export const ExampleProgress = () => {
	return (
		<S.Col>
			<S.Title>
				<Text variant="title">Progress</Text>
			</S.Title>

			<Progress percent={75} />
		</S.Col>
	);
};
