import { Compose } from "./components/compose/Compose";
import { Plus } from "./components/plus/Plus";
import { Minus } from "./components/minus/Minus";
import { Value } from "./components/value/Value";

export interface Props {
	className?: string | undefined;
	min: number;
	max: number;
	val: number;
}

export const Counter = ({ className, ...rest }: Props) => {
	return (
		<Counter.Compose {...rest} className={className}>
			<Minus />
			<Value />
			<Plus />
		</Counter.Compose>
	);
};

Counter.Compose = Compose;
Counter.Minus = Minus;
Counter.Plus = Plus;
Counter.Value = Value;
