import { type Dispatch, type SetStateAction, createContext, useContext } from "react";

export const ContextSelect = createContext<{
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onClickDisplay: () => void;
	onClickItem: (event: React.MouseEvent, index: number) => void;
} | null>(null);

export const useContextSelect = () => {
	const context = useContext(ContextSelect);

	if (!context) {
		throw new Error("useContextSelect must be rendered as a child component");
	}

	return context;
};
