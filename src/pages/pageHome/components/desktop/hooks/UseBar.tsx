import { createContext, useContext } from "react";

export const BarContext = createContext<{ onClickclose: () => void } | null>(null);

export const useBar = () => {
	const context = useContext(BarContext);

	if (!context) {
		throw new Error("useBar must be rendered as a child component");
	}

	return context;
};
