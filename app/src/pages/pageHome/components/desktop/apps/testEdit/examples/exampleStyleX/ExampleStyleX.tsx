import { Text } from "@src/components/text/Text";
import * as S from "../../TestEdit.styles";
import { Box1, Box2, Box3, Box4 } from "./ExampleStyleX.stylex";

export const ExampleStyleX = () => {
	return (
		<S.Col>
			<S.Title>
				<Text variant="title">StyleX</Text>
			</S.Title>

			<S.Col>
				<Box1>Box div based on stylex with theme</Box1>
			</S.Col>

			<S.Col>
				<Box2>Box span based on stylex with theme</Box2>
			</S.Col>

			<S.Col>
				<Box3 onClick={() => {}}>Box span based on stylex with theme</Box3>
			</S.Col>

			<S.Col>
				<Box4 href="https://google.com" target="_blank" rel="noopener noreferrer">
					Box a based on stylex with theme
				</Box4>
			</S.Col>
		</S.Col>
	);
};
