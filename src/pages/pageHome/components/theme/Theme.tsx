import * as S from "./Theme.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";

export const Theme = () => {
	return (
		<S.Theme>
			<List.Title>Theme</List.Title>

			<List>
				<List.Cell>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Light</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="v" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell>
					<List.Cell.Image>
						<Icon iconName="globe" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Dark</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="" />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Theme>
	);
};
