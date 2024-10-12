import * as S from "./Switch.styles";

export type SwitchState = "left" | "right";

interface Props {
	className?: string;
	switchState: SwitchState;
	onClickSwitch: (switchState: SwitchState) => void;
}

export const Switch = ({ className, onClickSwitch, switchState = "left" }: Props) => {
	const handleOnClick = () => {
		onClickSwitch(switchState);
	};

	return (
		<S.Container className={className} onClick={handleOnClick}>
			<S.Dot $switchState={switchState} />
		</S.Container>
	);
};
