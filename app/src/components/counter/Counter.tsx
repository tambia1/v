import type { ReactNode } from "react";
import { Button } from "./components/button/Button";
import { Compose } from "./components/compose/Compose";
import { Value } from "./components/value/Value";

export type Props = {
	className?: string;
	children: ReactNode;
	onClickMinus: () => void;
	onClickPlus: () => void;
};

export const Counter = ({ className, children, onClickMinus, onClickPlus, ...rest }: Props) => {
	return (
		<Counter.Compose {...rest} className={className}>
			<Value>{children}</Value>
			<Button iconName="iconMinusSquare" onClick={onClickMinus} />
			<Button iconName="iconPlusSquare" onClick={onClickPlus} />
		</Counter.Compose>
	);
};

Counter.Compose = Compose;
Counter.Minus = Button;
Counter.Plus = Button;
Counter.Value = Value;
