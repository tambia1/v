import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import type React from "react";
import { useRef } from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link" | "none";

export interface Props extends React.ComponentPropsWithoutRef<"button"> {
	className?: string;
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
	});

	return (
		<S.Button ref={refButton} className={className} $variant={varian} {...rest}>
			{children}
		</S.Button>
	);
};
