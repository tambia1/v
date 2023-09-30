import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";

export const Language = () => {
	return (
		<S.Language>
			<List.Title>Language</List.Title>

			<List>
				<List.Cell>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Language</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell>
					<List.Cell.Image>
						<Icon iconName="aperture" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Theme</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="chevronRight" />
					</List.Cell.Arrow>
				</List.Cell>
				<List.Cell>About</List.Cell>
			</List>
		</S.Language>
	);
};
