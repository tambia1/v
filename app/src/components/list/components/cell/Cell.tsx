import type { HTMLProps, ReactNode } from "react";
import * as S from "./Cell.styles";
import { CellCenter } from "./components/cellCenter/CellCenter";
import { CellEnd } from "./components/cellEnd/CellEnd";
import { CellLeft } from "./components/cellLeft/CellLeft";
import { CellRight } from "./components/cellRight/CellRight";

export type LineState = "long" | "short";

export interface Props extends HTMLProps<HTMLDivElement> {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
	$lineState?: LineState;
}

export const Cell = ({ children, $isEnabled, $isSelected, $lineState = "short", ...rest }: Props) => {
	return (
		<S.Cell $isEnabled={$isEnabled ?? true} $isSelected={$isSelected ?? false} {...rest}>
			<S.Content>{children}</S.Content>
			<S.Line $lineState={$lineState} />
		</S.Cell>
	);
};

Cell.Left = CellLeft;
Cell.Center = CellCenter;
Cell.Right = CellRight;
Cell.End = CellEnd;
