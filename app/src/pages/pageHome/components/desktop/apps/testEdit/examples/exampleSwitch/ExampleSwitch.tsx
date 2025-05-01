import { Switch } from "@src/components/switch/Switch";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleSwitch = () => {
	const [switchChecked, setSwitchChecked] = useState(false);

	const handleOnClickSwitch = () => {
		setSwitchChecked(!switchChecked);
	};

	return (
		<S.Col>
			<S.Title>Switch</S.Title>

			<S.Row>
				<S.Cell>Enables</S.Cell>
				<S.Cell>Disabled</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>
					<Switch data-testid="switch-test" checked={switchChecked} onClickSwitch={handleOnClickSwitch} />
				</S.Cell>
				<S.Cell>
					<Switch disabled data-testid="switch-test" checked={false} onClickSwitch={() => {}} />
				</S.Cell>
			</S.Row>
		</S.Col>
	);
};
