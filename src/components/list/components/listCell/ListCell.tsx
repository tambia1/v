import { List } from "../../List";
import { Text } from "@src/components/text/Text";
import { Icon } from "@src/components/icon/Icon";
import { IconName } from "@src/components/icon/Icon.types";

interface Props {
	leftIconName?: IconName;
	text?: string;
	rightIconName?: IconName;
	onClick?: () => void;
}

export const ListCell = ({ leftIconName, text, rightIconName, onClick }: Props) => {
	return (
		<List.Cell onClick={onClick}>
			{leftIconName && (
				<List.Cell.Image>
					<Icon iconName={leftIconName} />
				</List.Cell.Image>
			)}
			{text && (
				<List.Cell.Text>
					<Text>{text}</Text>
				</List.Cell.Text>
			)}
			{rightIconName && (
				<List.Cell.Arrow>
					<Icon iconName={rightIconName} />
				</List.Cell.Arrow>
			)}
		</List.Cell>
	);
};
