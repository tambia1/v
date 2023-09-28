import { createContext, useContext } from "react";
import { TBody } from "../components/body/Body";
import { TPage } from "../Pager";

export const PagerContext = createContext<{
	pages: TPage[];
	push: (node: TBody) => void;
	pop: () => void;
	home: () => void;
} | null>(null);

export const usePager = () => {
	const context = useContext(PagerContext);

	if (!context) {
		throw new Error("Pager must be rendered as a child component");
	}

	return context;
};
