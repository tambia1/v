import * as stylex from "@stylexjs/stylex";
import { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
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

export const Box2 = ({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) => {
	return (
		<Elm as="span" {...rest} style={[style.default]}>
			{children}
		</Elm>
	);
};

export const Box3 = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<Elm as="div" {...rest} style={[style.default]}>
			{children}
		</Elm>
	);
};

export const Box4 = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
	return (
		<Elm as="a" {...rest} style={[style.default]}>
			{children}
		</Elm>
	);
};
