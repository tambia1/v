import { Check } from "@src/components/check/Check";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../TestEdit.styles";

export const ExampleCheck = () => {
	const [checkState, setCheckState] = useState(true);

	const handleOnclickCheck = () => {
		setCheckState(!checkState);
	};

	return (
		<S.Col>
			<Text>Check</Text>

			<S.Row>
				<S.Cell>Enables</S.Cell>
				<S.Cell>Disabled</S.Cell>
			</S.Row>

			<S.Row>
				<S.Cell>
					<Check data-testid="check-test" checked={checkState} onClickCheck={handleOnclickCheck} />
				</S.Cell>
				<S.Cell>
					<Check disabled data-testid="check-test" checked={checkState} onClickCheck={handleOnclickCheck} />
				</S.Cell>
			</S.Row>
		</S.Col>
	);
};
