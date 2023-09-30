import { Arrow } from "../components/arrow/Arrow";
import { Image } from "../components/image/Image";
import { Text } from "../components/text/Text";
import * as S from "./Cell.styles";
import { ReactNode, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
}

export const Cell = ({ children, $isEnabled: isEnabled, $isSelected: isSelected, ...rest }: Props) => {
	return (
		<S.Cell $isEnabled={isEnabled ?? true} $isSelected={isSelected ?? false} {...rest}>
			<S.Content>{children}</S.Content>
			<S.Line />
		</S.Cell>
	);
};

Cell.Text = Text;
Cell.Image = Image;
Cell.Arrow = Arrow;
