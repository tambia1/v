import { ITheme } from "@src/themes/Theme.types";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const ThemeContext = createContext<{ theme: ITheme; setTheme: (theme: ITheme) => void } | null>(null);

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("Theme must be rendered as a child component");
	}

	return context;
};
