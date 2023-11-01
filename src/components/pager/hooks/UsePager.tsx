import { createContext, useContext } from "react";
import { IPage } from "../components/page/Page";
import { ICallback, IPagerItem } from "../Pager";

export const PagerContext = createContext<{
	pages: IPagerItem[];
	pushPage: (page: IPage) => void;
	popPage: () => void;
	goHome: () => void;

	listenToPushStart: (key: string, callback: ICallback) => void;
	listenToPushEnd: (key: string, callback: ICallback) => void;
	listenToPopStart: (key: string, callback: ICallback) => void;
	listenToPopEnd: (key: string, callback: ICallback) => void;
	listenToBack: (key: string, callback: ICallback) => void;
	listenToClose: (key: string, callback: ICallback) => void;
} | null>(null);

export const usePager = () => {
	const context = useContext(PagerContext);

	if (!context) {
		throw new Error("Pager must be rendered as a child component");
	}

	return context;
};
