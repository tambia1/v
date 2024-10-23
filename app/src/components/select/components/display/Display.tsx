import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";
import { useContextSelect } from "../../context/UseContextSelect";
import * as S from "./Display.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const Display = ({ children }: Props) => {
	const contextSelect = useContextSelect();

	return (
		<List>
			<List.Cell onClick={contextSelect.onClickDisplay}>
				<List.Cell.Text>{children}</List.Cell.Text>
				<List.Cell.Image>
					<S.ContainerIconArrow $isOpen={contextSelect.isOpen}>
						<Icon iconName="iconChevronDown" />
					</S.ContainerIconArrow>
				</List.Cell.Image>
			</List.Cell>
		</List>
	);
};
