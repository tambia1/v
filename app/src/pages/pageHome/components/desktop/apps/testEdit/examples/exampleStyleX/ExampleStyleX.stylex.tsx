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

export const Box1 = ({ children }: { children: ReactNode }) => {
	return <Elm style={[style.default]}>{children}</Elm>;
};

export const Box2 = ({ children }: { children: ReactNode }) => {
	return (
		<Elm as="span" style={[style.default]}>
			{children}
		</Elm>
	);
};
