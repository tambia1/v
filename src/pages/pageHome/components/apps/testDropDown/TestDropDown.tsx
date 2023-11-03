import { useState } from "react";
import { DropDown } from "@src/components/dropDown/DropDown";
import * as S from "./TestDropDown.styles";
import { Text } from "@src/components/text/Text";

export const TestDropDown = () => {
	const [selectedIndex, setSelectedIndex] = useState(1);

	const onClickItem = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<S.TestDropDown>
			<Text>Selected Inedx: {selectedIndex.toString()}</Text>

			<DropDown selectedIndex={selectedIndex} onClickItem={onClickItem}>
				<DropDown.Item>Item 0</DropDown.Item>
				<DropDown.Item>Item 1</DropDown.Item>
				<DropDown.Item>Item 2</DropDown.Item>
			</DropDown>
		</S.TestDropDown>
	);
};
