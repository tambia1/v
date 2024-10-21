import { Icon } from "@src/components/icon/Icon";
import { type ReactNode, useState } from "react";
import { List } from "../list/List";
import * as S from "./Select.styles";
import { Item } from "./components/item/Item";

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
					<List.Cell.Center>{children[selectedIndex]}</List.Cell.Center>
					<List.Cell.Right>
						<S.ContainerIconArrow $isOpen={isOpen}>
							<Icon iconName="iconChevronDown" />
						</S.ContainerIconArrow>
					</List.Cell.Right>
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
							$lineState="long"
						>
							<List.Cell.Center>{item}</List.Cell.Center>
						</List.Cell>
					))}
				</List>
			</S.ListContainer>
		</S.Select>
	);
};

Select.Item = Item;
