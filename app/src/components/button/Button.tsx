import React from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
	variant?: IVariant;
}

export const Button = ({ children, variant: varian = "styled", ...rest }: Props) => {
	return (
		<S.Button $variant={varian} {...rest}>
			{children}
		</S.Button>
	);
};
