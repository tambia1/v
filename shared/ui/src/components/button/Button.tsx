import type React from "react";
import * as S from "./Button.styles";

export type IVariant = "full" | "stroke" | "link";

type Props = React.ComponentPropsWithoutRef<"button"> & {
	varian: IVariant;
};

export const Button = ({ children, varian = "full", ...rest }: Props) => {
	return (
		<S.Button {...rest} $variant={varian}>
			{children}
		</S.Button>
	);
};
