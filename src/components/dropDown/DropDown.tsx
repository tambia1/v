import { ReactNode, useState } from "react";
import * as S from "./DropDown.styles";
import { List } from "./components/list/List";
import { Icon } from "@src/icons/Icon";

interface Props {
	children?: ReactNode;
}

export const DropDown = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOnClickButton = () => {
		setIsOpen(!isOpen);
	};

	return (
		<S.DropDown>
			<DropDown.List>
				<DropDown.List.Cell onClick={handleOnClickButton}>
					<DropDown.List.Cell.CellCenter>All</DropDown.List.Cell.CellCenter>
					<DropDown.List.Cell.CellRight>
						<S.ContainerIconArrow $isOpen={isOpen}>
							<Icon iconName="iconChevronDown" />
						</S.ContainerIconArrow>
					</DropDown.List.Cell.CellRight>
				</DropDown.List.Cell>
			</DropDown.List>
			<S.ListContainer $isOpen={isOpen}>
				<DropDown.List>
					<DropDown.List.Cell>Item 0</DropDown.List.Cell>
					<DropDown.List.Cell>Item 1</DropDown.List.Cell>
					<DropDown.List.Cell>Item 2</DropDown.List.Cell>
				</DropDown.List>
			</S.ListContainer>
			{children}
		</S.DropDown>
	);
};

DropDown.List = List;
