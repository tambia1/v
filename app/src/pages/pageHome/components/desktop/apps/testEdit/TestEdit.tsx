import { Switch, type SwitchState } from "@src/components/switch/Switch";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import * as S from "./TestEdit.styles";

export const TestEdit = () => {
	const [isEditMode, setIsEditMode] = useState<SwitchState>("left");

	const handleOnClickSwitch = () => {
		setIsEditMode(isEditMode === "left" ? "right" : "left");
	};

	return (
		<S.TestEdit>
			<Text size="l">
				<T>{lang.testEdit.title}</T>
			</Text>

			<S.Spacer />

			<S.Col>
				<S.Row>
					<Text>Edit mode</Text>
					<Switch switchState={isEditMode} onClickSwitch={handleOnClickSwitch} />
				</S.Row>

				<S.Row>
					<Text>Edit mode</Text>
					<Switch switchState={isEditMode} onClickSwitch={handleOnClickSwitch} />
				</S.Row>
			</S.Col>
		</S.TestEdit>
	);
};
