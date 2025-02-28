import { Input } from "@src/components/input/Input";
import { Stepper } from "@src/components/stepper/Stepper";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../TestEdit.styles";

export const ExampleStepper = () => {
	const [stepperValue, setStepperValue] = useState(0);

	const handleOnClickMinusStepper = () => {
		setStepperValue(stepperValue - 1);
	};

	const handleOnClickPlusStepper = () => {
		setStepperValue(stepperValue + 1);
	};

	return (
		<S.Col>
			<Text>Stepper</Text>
			<S.Row>
				<Input value={String(stepperValue)} textAlign="center" />
				<Stepper onClickMinus={handleOnClickMinusStepper} onClickPlus={handleOnClickPlusStepper} />
			</S.Row>
		</S.Col>
	);
};
