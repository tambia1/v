import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import { Base, colors } from "./Themes.stylex";

const style = stylex.create({
	default: {
		color: colors.primary,
		backgroundColor: colors.secondary,
	},
});

export const Box = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<Base style={[style.default]} {...props}>
			{children}
		</Base>
	);
};
