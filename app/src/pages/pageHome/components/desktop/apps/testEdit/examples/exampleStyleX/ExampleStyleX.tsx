import { Text } from "@src/components/text/Text";
import * as S from "../../TestEdit.styles";
import { Box1, Box2 } from "./ExampleStyleX.stylex";

export const ExampleStyleX = () => {
	return (
		<S.Col>
			<Text>StyleX</Text>

			<S.Col>
				<Box1>Box div based on stylex with theme</Box1>
			</S.Col>

			<S.Col>
				<Box2>Box span based on stylex with theme</Box2>
			</S.Col>
		</S.Col>
	);
};
