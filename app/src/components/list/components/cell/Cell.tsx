import type { HTMLProps, ReactNode } from "react";
import * as S from "./Cell.styles";
import { CellCenter } from "./components/cellCenter/CellCenter";
import { CellEnd } from "./components/cellEnd/CellEnd";
import { CellLeft } from "./components/cellLeft/CellLeft";
import { CellRight } from "./components/cellRight/CellRight";

export interface Props extends HTMLProps<HTMLDivElement> {
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

Cell.Left = CellLeft;
Cell.Center = CellCenter;
Cell.Right = CellRight;
Cell.End = CellEnd;
