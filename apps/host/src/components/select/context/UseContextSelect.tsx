import { createContext, type Dispatch, type ReactElement, type SetStateAction, useContext } from "react";

export const ContextSelect = createContext<{
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	onClickDisplay: () => void;
	onClickItem: (event: React.MouseEvent, index: number, item: ReactElement<{ value: string }>) => void;
	width: string;
} | null>(null);

export const useContextSelect = () => {
	const context = useContext(ContextSelect);

	if (!context) {
		throw new Error("useContextSelect must be rendered as a child component");
	}

	return context;
};
