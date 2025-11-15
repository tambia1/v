import { Text } from "@src/components/text/Text";
import * as S from "../../TestEdit.styles";

export const ExampleText = () => {
	return (
		<S.Col>
			<S.Title>
				<Text variant="title">Text</Text>
			</S.Title>

			<S.Row>
				<S.Cell>title</S.Cell>
				<S.Cell>
					<Text variant="title">Test</Text>
				</S.Cell>
			</S.Row>
			<S.Row>
				<S.Cell>header</S.Cell>
				<S.Cell>
					<Text variant="header">Test</Text>
				</S.Cell>
			</S.Row>
			<S.Row>
				<S.Cell>body</S.Cell>
				<S.Cell>
					<Text variant="body">Test</Text>
				</S.Cell>
			</S.Row>
			<S.Row>
				<S.Cell>note</S.Cell>
				<S.Cell>
					<Text variant="note">Test</Text>
				</S.Cell>
			</S.Row>
		</S.Col>
	);
};
