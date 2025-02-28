import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import * as S from "../TestEdit.styles";

export const ExampleButton = () => {
	return (
		<S.Col>
			<Text>Button</Text>

			<S.Row>
				<S.Cell />
				<S.Cell>Enables</S.Cell>
				<S.Cell>Disabled</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>variant="styled"</S.Cell>
				<S.Cell>
					<Button variant="styled">Button Text</Button>
				</S.Cell>
				<S.Cell>
					<Button variant="styled" disabled>
						Button Text
					</Button>
				</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>variant="full"</S.Cell>
				<S.Cell>
					<Button variant="full">Button Text</Button>
				</S.Cell>
				<S.Cell>
					<Button variant="full" disabled>
						Button Text
					</Button>
				</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>variant="stroke"</S.Cell>
				<S.Cell>
					<Button variant="stroke">Button Text</Button>
				</S.Cell>
				<S.Cell>
					<Button variant="stroke" disabled>
						Button Text
					</Button>
				</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>variant="link"</S.Cell>
				<S.Cell>
					<Button variant="link">Button Text</Button>
				</S.Cell>
				<S.Cell>
					<Button variant="link" disabled>
						Button Text
					</Button>
				</S.Cell>
			</S.Row>
		</S.Col>
	);
};
