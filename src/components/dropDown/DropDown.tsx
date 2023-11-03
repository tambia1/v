import { ReactNode, useState } from "react";
import * as S from "./DropDown.styles";
import { List } from "./components/list/List";

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
				<DropDown.List.Cell onClick={handleOnClickButton}>All</DropDown.List.Cell>
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
