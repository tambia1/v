import { ReactNode, useState } from "react";
import * as S from "./DropDown.styles";
import { List } from "./components/list/List";
import { Icon } from "@src/icons/Icon";
import { Item } from "./components/item/Item";

interface Props {
	children: ReactNode[];
	selectedIndex: number;
	onClickItem: (index: number) => void;
}

export const DropDown = ({ children, selectedIndex, onClickItem }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOnClickButton = () => {
		setIsOpen(!isOpen);
	};

	const handleOnClickCell = (index: number) => {
		onClickItem(index);
		setIsOpen(false);
	};

	return (
		<S.DropDown>
			<List>
				<List.Cell onClick={handleOnClickButton}>
					<List.Cell.CellCenter>{children[selectedIndex]}</List.Cell.CellCenter>
					<List.Cell.CellRight>
						<S.ContainerIconArrow $isOpen={isOpen}>
							<Icon iconName="iconChevronDown" />
						</S.ContainerIconArrow>
					</List.Cell.CellRight>
				</List.Cell>
			</List>
			<S.ListContainer $isOpen={isOpen}>
				<List>
					{children.map((item, index) => (
						<List.Cell
							key={index}
							onClick={() => {
								handleOnClickCell(index);
							}}
						>
							{item}
						</List.Cell>
					))}
				</List>
			</S.ListContainer>
		</S.DropDown>
	);
};

DropDown.Item = Item;
