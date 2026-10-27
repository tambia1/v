import { Button } from "./components/button/Button";
import { Root } from "./components/root/Root";
import * as S from "./Stepper.styles";

export type Props = {
	className?: string;
	onClickMinus: () => void;
	onClickPlus: () => void;
};

export const Stepper = ({ className, onClickMinus, onClickPlus, ...rest }: Props) => {
	return (
		<Stepper.Root {...rest} className={className}>
			<Button iconName="iconMinus" onClick={onClickMinus} />
			<S.Line />
			<Button iconName="iconPlus" onClick={onClickPlus} />
		</Stepper.Root>
	);
};

Stepper.Root = Root;
Stepper.Minus = Button;
Stepper.Plus = Button;
