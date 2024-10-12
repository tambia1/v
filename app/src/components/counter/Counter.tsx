import { Compose } from "./components/compose/Compose";
import { Minus } from "./components/minus/Minus";
import { Plus } from "./components/plus/Plus";
import { Value } from "./components/value/Value";

export type Props = {
	className?: string | undefined;
	val: string | number;
	onClickMinus: () => void;
	onClickPlus: () => void;
};

export const Counter = ({ className, val, onClickMinus, onClickPlus, ...rest }: Props) => {
	return (
		<Counter.Compose {...rest} className={className}>
			<Minus onClickMinus={onClickMinus} />
			<Value val={val} />
			<Plus onClickPlus={onClickPlus} />
		</Counter.Compose>
	);
};

Counter.Compose = Compose;
Counter.Minus = Minus;
Counter.Plus = Plus;
Counter.Value = Value;
