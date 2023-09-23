import { ReactNode, createContext, useContext } from "react";

export const PagerContext = createContext<{ items: { id: string; node: ReactNode }[]; push: (id: string, node: ReactNode) => void; pop: () => void; home: () => void } | null>(null);

export const usePager = () => {
	const context = useContext(PagerContext);

	if (!context) {
		throw new Error("Pager must be rendered as a child component");
	}

	return context;
};
