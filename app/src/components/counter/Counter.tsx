import * as S from "./Counter.styles";
import { Text } from "../text/Text";
import { useState } from "react";

export interface Props {
	className?: string | undefined;
	min: number;
	max: number;
}

export const Counter = ({ className, ...rest }: Props) => {
	const [value, setValue] = useState(0);

	const handleOnClickMinus = () => {
		setValue(value - 1);
	};

	const handleOnClickPlus = () => {
		setValue(value + 1);
	};

	return (
		<S.Counter className={className} {...rest}>
			<S.IconCounter iconName="iconMinusSquare" onClick={handleOnClickMinus} />
			<Text>{value}</Text>
			<S.IconCounter iconName="iconPlusSquare" onClick={handleOnClickPlus} />
		</S.Counter>
	);
};
