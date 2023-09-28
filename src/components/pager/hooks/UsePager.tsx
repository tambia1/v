import { createContext, useContext } from "react";
import { IPage } from "../components/page/Page";
import { ILeave } from "../Pager";

export const PagerContext = createContext<{
	pages: ILeave[];
	push: (node: IPage) => void;
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
