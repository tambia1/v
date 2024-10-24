import { Select } from "@src/components/select/Select";
import { Space } from "@src/components/space/Space";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "./TestSelect.styles";

export const TestSelect = () => {
	const [selectedOption, setSelectedOption] = useState(1);

	const handleOnClickSelectOption = (index: number) => {
		setSelectedOption(index);
	};

	return (
		<S.TestSelect>
			<Text>Selected Inedx: {selectedOption.toString()}</Text>

			<Space />

			<Select onClickItem={handleOnClickSelectOption}>
				<Select.Display>{`Item ${selectedOption}`}</Select.Display>
				<Select.Items>
					<Select.Items.Item>Item 0</Select.Items.Item>
					<Select.Items.Item>Item 1</Select.Items.Item>
					<Select.Items.Item>Item 2</Select.Items.Item>
				</Select.Items>
			</Select>
		</S.TestSelect>
	);
};
