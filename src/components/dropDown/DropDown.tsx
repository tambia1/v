import { useState } from "react";
import * as S from "./DropDown.styles";
import { List } from "./components/list/List";
import { Icon } from "@src/icons/Icon";

interface Props {
	items: string[];
	selectedItemIndex: number;
}

export const DropDown = ({ items, selectedItemIndex }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(selectedItemIndex);

	const handleOnClickButton = () => {
		setIsOpen(!isOpen);
	};

	const handleOnClickCell = (index: number) => {
		setSelectedIndex(index);
		setIsOpen(false);
	};

	return (
		<S.DropDown>
			<DropDown.List>
				<DropDown.List.Cell onClick={handleOnClickButton}>
					<DropDown.List.Cell.CellCenter>{items[selectedIndex]}</DropDown.List.Cell.CellCenter>
					<DropDown.List.Cell.CellRight>
						<S.ContainerIconArrow $isOpen={isOpen}>
							<Icon iconName="iconChevronDown" />
						</S.ContainerIconArrow>
					</DropDown.List.Cell.CellRight>
				</DropDown.List.Cell>
			</DropDown.List>
			<S.ListContainer $isOpen={isOpen}>
				<DropDown.List>
					{items.map((item, index) => (
						<DropDown.List.Cell
							onClick={() => {
								handleOnClickCell(index);
							}}
						>
							{item}
						</DropDown.List.Cell>
					))}
				</DropDown.List>
			</S.ListContainer>
		</S.DropDown>
	);
};

DropDown.List = List;
