import { ReactNode, useState } from "react";
import * as S from "./Compose.styles";
import { CounterContext } from "../contexts/Counter.context";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	min: number;
	max: number;
	val: number;
}

export const Compose = ({ children, val, min, max, ...rest }: Props) => {
	const [value, setValue] = useState(val);

	return (
		<S.Compose {...rest}>
			<CounterContext.Provider value={{ val: value, setVal: setValue, min, max }}>{children}</CounterContext.Provider>
		</S.Compose>
	);
};
