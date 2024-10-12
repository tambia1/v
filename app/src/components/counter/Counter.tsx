import { Compose } from "./components/compose/Compose";
import { Minus } from "./components/minus/Minus";
import { Plus } from "./components/plus/Plus";
import { Value } from "./components/value/Value";

export type Props = {
	className?: string;
	val: string | number;
	onClickMinus: () => void;
	onClickPlus: () => void;
};

export const Counter = ({ className, val, onClickMinus, onClickPlus, ...rest }: Props) => {
	return (
		<Counter.Compose {...rest} className={className}>
			<Minus onClick={onClickMinus} />
			<Value val={val} />
			<Plus onClick={onClickPlus} />
		</Counter.Compose>
	);
};

Counter.Compose = Compose;
Counter.Minus = Minus;
Counter.Plus = Plus;
Counter.Value = Value;
