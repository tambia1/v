import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import { Elm, colors } from "./Themes.stylex";

const style = stylex.create({
	default: {
		display: "flex",
		width: "fit-content",
		padding: "5px",
		borderRadius: "5px",
		color: colors.primary,
		backgroundColor: colors.secondary,
		boxShadow: `1px 1px 5px 1px ${colors.primary}`,
	},
});

export const Box = ({ children, ...props }: { children: ReactNode }) => {
	return (
		<Elm style={[style.default]} {...props}>
			{children}
		</Elm>
	);
};
