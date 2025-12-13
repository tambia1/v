import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { Button } from "@v/shared-ui";
import * as S from "./TestShared.styles";

export const TestShared = () => {
	return (
		<S.TestShared>
			<Text variant="title">
				<T>{lang.testShared.title}</T>
			</Text>

			<S.Col>
				<S.Title>
					<Text variant="title">Shared Button</Text>
				</S.Title>

				<S.Row>
					<S.Cell />
					<S.Cell>Enabled</S.Cell>
					<S.Cell>Disabled</S.Cell>
				</S.Row>

				<S.Row>
					<S.Cell>varian="full"</S.Cell>
					<S.Cell>
						<Button varian="full">Button Text</Button>
					</S.Cell>
					<S.Cell>
						<Button varian="full" disabled>
							Button Text
						</Button>
					</S.Cell>
				</S.Row>

				<S.Row>
					<S.Cell>varian="stroke"</S.Cell>
					<S.Cell>
						<Button varian="stroke">Button Text</Button>
					</S.Cell>
					<S.Cell>
						<Button varian="stroke" disabled>
							Button Text
						</Button>
					</S.Cell>
				</S.Row>

				<S.Row>
					<S.Cell>varian="link"</S.Cell>
					<S.Cell>
						<Button varian="link">Button Text</Button>
					</S.Cell>
					<S.Cell>
						<Button varian="link" disabled>
							Button Text
						</Button>
					</S.Cell>
				</S.Row>
			</S.Col>
		</S.TestShared>
	);
};
