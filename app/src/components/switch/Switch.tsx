import * as S from "./Switch.styles";

export type SwitchState = "left" | "right";

type Props = {
	className?: string;
	switchState: SwitchState;
	onClickSwitch: (switchState: SwitchState) => void;
};

export const Switch = ({ className, onClickSwitch, switchState = "left" }: Props) => {
	const handleOnClick = () => {
		onClickSwitch(switchState);
	};

	return (
		<S.Switch className={className} onClick={handleOnClick}>
			<S.Dot $switchState={switchState} />
		</S.Switch>
	);
};
