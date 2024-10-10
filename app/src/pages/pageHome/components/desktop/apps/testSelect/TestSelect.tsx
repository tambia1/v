import { Select } from "@src/components/select/Select";
import { Space } from "@src/components/space/Space";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "./TestSelect.styles";

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
