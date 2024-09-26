import { createContext, useContext } from "react";
import { IPage } from "../components/page/Page";
import { IAction, ICallback, INavigatorItem } from "../Navigator";

export const NavigatorContext = createContext<{
	pages: INavigatorItem[];
	pushPage: (page: IPage) => void;
	popPage: () => void;
	goHome: () => void;

	addPage: (index: number, page: IPage) => void;
	removePage: (index: number) => void;

	addListener: (action: IAction, key: string, callback: ICallback) => void;
	removeListener: (action: IAction, key: string) => void;
} | null>(null);

export const useNavigator = () => {
	const context = useContext(NavigatorContext);

	if (!context) {
		throw new Error("useNavigator must be rendered as a child component");
	}

	return context;
};
