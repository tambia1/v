import { Arrow } from "../components/arrow/Arrow";
import { Image } from "../components/image/Image";
import { Text } from "../components/text/Text";
import * as S from "./ListCell.styles";
import { ReactNode, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
}

export const ListCell = ({ children, $isEnabled: isEnabled, $isSelected: isSelected, ...rest }: Props) => {
	return (
		<S.ListCell $isEnabled={isEnabled ?? true} $isSelected={isSelected ?? false} {...rest}>
			<S.Content>{children}</S.Content>
			<S.Line />
		</S.ListCell>
	);
};

ListCell.Text = Text;
ListCell.Image = Image;
ListCell.Arrow = Arrow;
