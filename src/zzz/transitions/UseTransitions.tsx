import { useContext } from "react";
import { TransitionsContext } from "./Transitions";

export const useTransitions = () => {
	const context = useContext(TransitionsContext);

	if (!context) {
		throw new Error("useTransitions must be used within a TransitionsProvider");
	}

	return context;
};
