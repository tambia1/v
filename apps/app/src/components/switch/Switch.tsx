import * as S from "./Switch.styles";

export type SwitchState = "left" | "right";

interface Props {
	switchState: SwitchState;
	onClickSwitch: (switchState: SwitchState) => void;
}

export const Switch = ({ onClickSwitch, switchState = "left" }: Props) => {
	const handleOnClick = () => {
		onClickSwitch(switchState);
	};

	return (
		<S.Container onClick={handleOnClick}>
			<S.Dot $switchState={switchState} />
		</S.Container>
	);
};
