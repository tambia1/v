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

			<Select onClickOption={handleOnClickSelectOption}>
				<Select.Display>{`Item ${selectedOption}`}</Select.Display>
				<Select.Options>
					<Select.Options.Item>Item 0</Select.Options.Item>
					<Select.Options.Item>Item 1</Select.Options.Item>
					<Select.Options.Item>Item 2</Select.Options.Item>
				</Select.Options>
			</Select>
		</S.TestSelect>
	);
};
