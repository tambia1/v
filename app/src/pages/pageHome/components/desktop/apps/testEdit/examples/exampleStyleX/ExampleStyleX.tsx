import { Text } from "@src/components/text/Text";
import * as S from "../../TestEdit.styles";
import { Box } from "./ExampleStyleX.stylex";

export const ExampleStyleX = () => {
	return (
		<S.Col>
			<Text>StyleX</Text>

			<S.Col>
				<Box>Box based on stylex with theme</Box>
			</S.Col>
		</S.Col>
	);
};
