import { Progress } from "@src/components/progress/Progress";
import * as S from "../../TestEdit.styles";

export const ExampleProgress = () => {
	return (
		<S.Col>
			<S.Title>Progress</S.Title>

			<Progress percent={75} />
		</S.Col>
	);
};
