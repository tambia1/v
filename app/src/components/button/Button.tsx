import React, { useRef } from "react";
import * as S from "./Button.styles";
import { ITouch, useTouch } from "@src/hooks/UseTouch";

export type IVariant = "styled" | "full" | "stroke" | "link" | "none";

export interface Props extends React.ComponentPropsWithoutRef<"button"> {
	className?: string | undefined;
	variant?: IVariant;
	onLongClick?: (e: TouchEvent | MouseEvent) => void;
}

export const Button = ({ className, children, variant: varian = "styled", onLongClick, ...rest }: Props) => {
	const refButton = useRef<HTMLButtonElement>(null);

	useTouch({
		ref: refButton,
		onTouch: ({ status, e }: ITouch) => {
			if (status === "long") {
				onLongClick?.(e);
			}
		},
		deps: [refButton.current],
	});

	return (
		<S.Button ref={refButton} className={className} $variant={varian} {...rest}>
			{children}
		</S.Button>
	);
};
