import { createContext, useContext } from "react";
import { IPage } from "../components/page/Page";
import { IPagerItem } from "../Pager";

export const PagerContext = createContext<{
	pages: IPagerItem[];
	pushPage: (page: IPage) => void;
	popPage: () => void;
	goHome: () => void;
} | null>(null);

export const usePager = () => {
	const context = useContext(PagerContext);

	if (!context) {
		throw new Error("Pager must be rendered as a child component");
	}

	return context;
};
