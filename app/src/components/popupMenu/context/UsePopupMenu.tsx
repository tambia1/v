import { type RefObject, createContext, useContext } from "react";

export const ContextPopupMenu = createContext<{
	refButton: RefObject<HTMLDivElement>;
	refItems: RefObject<HTMLDivElement>;
	refCover: RefObject<HTMLDivElement>;
	position: { top: number; left: number };
	isItemsOpen: boolean;
	isVisible: boolean;
	onClickCover: () => void;
} | null>(null);

export const useContextMenu = () => {
	const context = useContext(ContextPopupMenu);

	if (!context) {
		throw new Error("useContextMenu must be rendered as a child component");
	}

	return context;
};
