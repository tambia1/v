import type React from "react";
import * as S from "./Button.styles";

export type Variant = "full" | "stroke" | "link";

type Props = React.ComponentPropsWithoutRef<"button"> & {
	varian: Variant;
};

export const Button = ({ children, varian = "full", ...rest }: Props) => {
	return (
		<S.Button {...rest} $variant={varian}>
			{children}
		</S.Button>
	);
};
