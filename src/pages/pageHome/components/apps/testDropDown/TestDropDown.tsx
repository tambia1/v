import { DropDown } from "@src/components/dropDown/DropDown";
import * as S from "./TestDropDown.styles";

export const TestDropDown = () => {
	return (
		<S.TestDropDown>
			<DropDown>
				<DropDown.List>
					<DropDown.List.Cell>All</DropDown.List.Cell>
				</DropDown.List>
				<DropDown.List>
					<DropDown.List.Cell>Item 0</DropDown.List.Cell>
					<DropDown.List.Cell>Item 1</DropDown.List.Cell>
					<DropDown.List.Cell>Item 2</DropDown.List.Cell>
				</DropDown.List>
			</DropDown>
		</S.TestDropDown>
	);
};
