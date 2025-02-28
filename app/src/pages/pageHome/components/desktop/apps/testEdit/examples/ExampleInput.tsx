import { Input } from "@src/components/input/Input";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../TestEdit.styles";

export const ExampleInput = () => {
	const [inputValue, setInputValue] = useState("Test");

	const handleOnTextChange = (value: string) => {
		setInputValue(value);
	};

	return (
		<S.Col>
			<Text>Input</Text>

			<S.Row>
				<S.Cell>Enables</S.Cell>
				<S.Cell>Disabled</S.Cell>
			</S.Row>

			<S.Row>
				<Input value={inputValue} onTextChange={handleOnTextChange} />
				<Input value={inputValue} onTextChange={handleOnTextChange} disabled />
			</S.Row>
		</S.Col>
	);
};
