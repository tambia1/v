import type { HTMLProps, ReactNode } from "react";
import * as S from "./Cell.styles";
import { CellInfo } from "./components/cellEnd/CellInfo";
import { CellIcon } from "./components/cellIcon/CellIcon";
import { CellImage } from "./components/cellImage/CellImage";
import { CellText } from "./components/cellText/CellText";

export type LineState = "long" | "short";

export interface Props extends HTMLProps<HTMLDivElement> {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
	$lineState?: LineState;
}

export const Cell = ({
	children,
	$isEnabled,
	$isSelected,
	$lineState = "short",
	...rest
}: Props) => {
	return (
		<S.Cell
			$isEnabled={$isEnabled ?? true}
			$isSelected={$isSelected ?? false}
			{...rest}
		>
			<S.Content>{children}</S.Content>
			<S.Line $lineState={$lineState} />
		</S.Cell>
	);
};

Cell.Icon = CellIcon;
Cell.Text = CellText;
Cell.Image = CellImage;
Cell.Info = CellInfo;
