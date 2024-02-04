import { createContext, useContext } from "react";
import { IPage } from "../components/page/Page";
import { IAction, ICallback, IPagerItem } from "../Pager";

export const PagerContext = createContext<{
	pages: IPagerItem[];
	pushPage: (page: IPage) => void;
	popPage: () => void;
	goHome: () => void;

	addListener: (action: IAction, key: string, callback: ICallback) => void;
	removeListener: (action: IAction, key: string) => void;
} | null>(null);

export const usePager = () => {
	const context = useContext(PagerContext);

	if (!context) {
		throw new Error("usePager must be rendered as a child component");
	}

	return context;
};
