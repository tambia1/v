import React from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
	varian?: IVariant;
}

export const Button = ({ children, varian = "styled", ...rest }: Props) => {
	return (
		<S.Button {...rest} $variant={varian}>
			{children}
		</S.Button>
	);
};
