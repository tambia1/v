import { Icon } from "@src/components/icon/Icon";
import { type ReactNode, useState } from "react";
import * as S from "./Select.styles";
import { Item } from "./components/item/Item";
import { List } from "./components/list/List";

export interface Props {
	className?: string;
	children: ReactNode[];
	selectedIndex: number;
	onClickItem: (index: number) => void;
}

export const Select = ({ className, children, selectedIndex, onClickItem }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOnClickButton = () => {
		setIsOpen(!isOpen);
	};

	const handleOnClickCell = (index: number) => {
		onClickItem(index);
		setIsOpen(false);
	};

	return (
		<S.Select className={className}>
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
		</S.Select>
	);
};

Select.Item = Item;
