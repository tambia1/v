import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const CounterContext = createContext<{
	min: number;
	max: number;
	val: number;
	setVal: Dispatch<SetStateAction<number>>;
} | null>(null);

export const useCounterContext = () => {
	const context = useContext(CounterContext);

	if (!context) {
		throw new Error("useCounterContext must be rendered as a child component");
	}

	return context;
};
