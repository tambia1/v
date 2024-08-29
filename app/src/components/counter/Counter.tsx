import * as S from "./Counter.styles";
import { Text } from "../text/Text";
import { useReducer } from "react";

export interface Props {
	className?: string | undefined;
	min: number;
	max: number;
	val: number;
}

interface State {
	count: number;
}
export const Counter = ({ className, min, max, val, ...rest }: Props) => {
	const [state, updateState] = useReducer(
		(prev: State, next: Partial<State>) => {
			const newState = { ...prev, ...next };

			if (newState.count > max) {
				newState.count = max;
			}

			if (newState.count < min) {
				newState.count = min;
			}

			return newState;
		},
		{ count: val }
	);

	const handleOnClickMinus = () => {
		updateState({ count: state.count - 1 });
	};

	const handleOnClickPlus = () => {
		updateState({ count: state.count + 1 });
	};

	return (
		<S.Counter className={className} {...rest}>
			<S.IconCounter iconName="iconMinusSquare" onClick={handleOnClickMinus} />

			<Text>{state.count}</Text>

			<S.IconCounter iconName="iconPlusSquare" onClick={handleOnClickPlus} />
		</S.Counter>
	);
};
