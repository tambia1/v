import { useState } from "react";
import { Select } from "@src/components/select/Select";
import * as S from "./TestSelect.styles";
import { Text } from "@src/components/text/Text";
import { Space } from "@src/components/space/Space";

export const TestSelect = () => {
	const [selectedIndex, setSelectedIndex] = useState(1);

	const onClickItem = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<S.TestSelect>
			<Text>Selected Inedx: {selectedIndex.toString()}</Text>

			<Space />

			<Select selectedIndex={selectedIndex} onClickItem={onClickItem}>
				<Select.Item>Item 0</Select.Item>
				<Select.Item>Item 1</Select.Item>
				<Select.Item>Item 2</Select.Item>
			</Select>
		</S.TestSelect>
	);
};
