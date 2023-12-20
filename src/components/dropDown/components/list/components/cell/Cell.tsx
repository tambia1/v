import { CellRight } from "./components/cellRight/CellRight";
import { CellLeft } from "./components/cellLeft/CellLeft";
import { CellCenter } from "./components/cellCenter/CellCenter";
import * as S from "./Cell.styles";
import { ReactNode, HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
}

export const Cell = ({ children, $isEnabled: isEnabled, $isSelected: isSelected }: Props) => {
	return (
		<S.Cell $isEnabled={isEnabled ?? true} $isSelected={isSelected ?? false}>
			<S.Content>{children}</S.Content>
			<S.Line />
		</S.Cell>
	);
};

Cell.CellCenter = CellCenter;
Cell.CellLeft = CellLeft;
Cell.CellRight = CellRight;
