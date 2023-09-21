import { useEffect, useState } from "react";
import * as S from "./Switch.styles";

interface Props {
	state?: S.SwitchState;
	onChange: (switchState: S.SwitchState) => void;
}

export const Switch = ({ onChange, state = "left" }: Props) => {
	const [switchState, setSwitchState] = useState(state);

	const handleOnClick = () => {
		const updatedState: S.SwitchState = switchState === "left" ? "right" : "left";

		setSwitchState(updatedState);
		onChange(updatedState);
	};

	useEffect(() => {
		setSwitchState(state);
	}, [state]);

	return (
		<S.Container onClick={handleOnClick}>
			<S.Dot $switchState={switchState} />
		</S.Container>
	);
};
