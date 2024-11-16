import { Switch } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";
import { Transition } from "@src/components/transition/Transition";
import { useState } from "react";
import * as S from "./TestTransition.styles";

export const TestTransition = () => {
	const [checked, setChecked] = useState(false);

	const onClickSwitch = (checked: boolean) => {
		setChecked(!checked);
	};

	return (
		<S.TestTransition>
			<S.SwitchContainer>
				<Text>Element 1</Text>
				<Switch checked={checked} onClickSwitch={onClickSwitch} />
				<Text>Element 2</Text>
			</S.SwitchContainer>

			<S.ElementContainer>
				<Transition>
					{!checked && "This is a sample text"}
					{checked && "A different text"}
				</Transition>
			</S.ElementContainer>
		</S.TestTransition>
	);
};
