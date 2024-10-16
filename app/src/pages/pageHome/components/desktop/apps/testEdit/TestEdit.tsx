import { Button } from "@src/components/button/Button";
import { Check } from "@src/components/check/Check";
import { Input } from "@src/components/input/Input";
import { Switch, type SwitchState } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import * as S from "./TestEdit.styles";

export const TestEdit = () => {
	const [isEnabledMode, setIsEnabledMode] = useState<SwitchState>("left");

	const [switchState, setSwitchState] = useState<SwitchState>("left");

	const [checkState, setCheckState] = useState(true);

	const [inputValue, setInputValue] = useState("Test");

	const handleOnClickSwitchEnabled = () => {
		setIsEnabledMode(isEnabledMode === "left" ? "right" : "left");
	};

	const handleOnClickSwitch = () => {
		setSwitchState(switchState === "left" ? "right" : "left");
	};

	const handleOnTextChange = (value: string) => {
		setInputValue(value);
	};

	const handleOnclickCheck = () => {
		setCheckState(!checkState);
	};

	return (
		<S.TestEdit>
			<Text size="l">
				<T>{lang.testEdit.title}</T>
			</Text>

			<S.Spacer />
			<S.Spacer />

			<S.Col>
				<S.Row>
					<S.Col>
						<Text>Enabled mode</Text>
						<Switch switchState={isEnabledMode} onClickSwitch={handleOnClickSwitchEnabled} />
					</S.Col>
				</S.Row>

				<S.Line />

				<S.Col>
					<Text>Switch</Text>
					<Switch switchState={switchState} onClickSwitch={handleOnClickSwitch} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Check</Text>
					<Check checkState={checkState} onClickCheck={handleOnclickCheck} />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Input</Text>
					<Input value={inputValue} onTextChange={handleOnTextChange} />
					<Input value={inputValue} onTextChange={handleOnTextChange} disabled />
				</S.Col>

				<S.Line />

				<S.Col>
					<Text>Button</Text>
					<S.Row>
						<Button variant="styled">Button Text</Button>
						<Button variant="full">Button Text</Button>
						<Button variant="stroke">Button Text</Button>
						<Button variant="link">Button Text</Button>
					</S.Row>
				</S.Col>
			</S.Col>
		</S.TestEdit>
	);
};
