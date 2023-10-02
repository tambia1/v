import * as S from "./Language.styles";
import { List } from "@src/components/list/List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { Flag } from "@src/components/flag/Flag";

export const Language = () => {
	return (
		<S.Language>
			<List.Title>Language</List.Title>

			<List>
				<List.Cell>
					<List.Cell.Image>
						<Flag flagName="greatBritain" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>English</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="v" />
					</List.Cell.Arrow>
				</List.Cell>

				<List.Cell>
					<List.Cell.Image>
						<Flag flagName="finland" />
					</List.Cell.Image>
					<List.Cell.Text>
						<Text>Finnish</Text>
					</List.Cell.Text>
					<List.Cell.Arrow>
						<Icon iconName="" />
					</List.Cell.Arrow>
				</List.Cell>
			</List>
		</S.Language>
	);
};
