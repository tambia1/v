import { createContext, useContext } from "react";
import { Action, Callback, NavigatorItem } from "../Navigator";
import { PageType } from "../Navigator.types";

export const NavigatorContext = createContext<{
	pages: NavigatorItem[];
	pushPage: (page: PageType) => void;
	popPage: () => void;
	goHome: () => void;

	addPage: (index: number, page: PageType) => void;
	removePage: (index: number) => void;

	addListener: (action: Action, key: string, callback: Callback) => void;
	removeListener: (action: Action, key: string) => void;
} | null>(null);

export const useNavigator = () => {
	const context = useContext(NavigatorContext);

	if (!context) {
		throw new Error("useNavigator must be rendered as a child component");
	}

	return context;
};
