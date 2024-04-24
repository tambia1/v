import { useState } from "react";
import * as S from "./TestTransition.styles";
import { Transition } from "@src/components/transition/Transition";
import { Switch, SwitchState } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";

export const TestTransition = () => {
	const [switchState, setSwitchState] = useState<SwitchState>("left");

	const onClickSwitch = (switchState: SwitchState) => {
		setSwitchState(switchState === "left" ? "right" : "left");
	};

	return (
		<S.TestTransition>
			<S.SwitchContainer>
				<Text>Element 1</Text>
				<Switch switchState={switchState} onClickSwitch={onClickSwitch} />
				<Text>Element 2</Text>
			</S.SwitchContainer>

			<S.ElementContainer>
				<Transition>
					{switchState === "left" && <>This is a sample text</>}
					{switchState === "right" && <>abcd efg</>}
				</Transition>
			</S.ElementContainer>
		</S.TestTransition>
	);
};
