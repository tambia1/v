import * as S from "./Stepper.styles";
import { Button } from "./components/button/Button";
import { Compose } from "./components/compose/Compose";

export type Props = {
	className?: string;
	onClickMinus: () => void;
	onClickPlus: () => void;
};

export const Stepper = ({ className, onClickMinus, onClickPlus, ...rest }: Props) => {
	return (
		<Stepper.Compose {...rest} className={className}>
			<Button iconName="iconMinus" onClick={onClickMinus} />
			<S.Line />
			<Button iconName="iconPlus" onClick={onClickPlus} />
		</Stepper.Compose>
	);
};

Stepper.Compose = Compose;
Stepper.Minus = Button;
Stepper.Plus = Button;
