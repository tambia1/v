import { createContext, useContext } from "react";

export const BarMainContext = createContext<{ onClickClose: () => void } | null>(null);

export const useBarMain = () => {
	const context = useContext(BarMainContext);

	if (!context) {
		throw new Error("useBar must be rendered as a child component");
	}

	return context;
};
