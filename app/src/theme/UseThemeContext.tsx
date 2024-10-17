import type { ITheme } from "@src/theme/Theme.types";
import { createContext, useContext } from "react";

export const ThemeContext = createContext<{ theme: ITheme; setTheme: (theme: ITheme) => void } | null>(null);

export const useThemeContext = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useThemeContext must be rendered as a child component");
	}

	return context;
};
