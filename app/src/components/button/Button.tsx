import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import type React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as S from "./Button.styles";

const sizes = {
	fitContent: "fit-content",
	xs: "5rem",
	s: "10rem",
	m: "15rem",
	l: "20rem",
	xl: "28rem",
} as const;

export type ISize = keyof typeof sizes;

export type IVariant = "styled" | "full" | "stroke" | "link" | "none";

export type Props = React.ComponentPropsWithoutRef<"button"> & {
	className?: string;
	variant?: IVariant;
	onLongClick?: (e: TouchEvent | MouseEvent) => void;
	size?: ISize;
};

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, variant = "styled", size = "m", onLongClick, ...rest }, ref) => {
	const refButton = useRef<HTMLButtonElement>(null);

	useTouch({
		ref: refButton,
		onTouch: ({ status, e }: ITouch) => {
			if (status === "long") {
				onLongClick?.(e);
			}
		},
	});

	useImperativeHandle(ref, () => refButton.current as HTMLButtonElement, []);

	return (
		<S.Button ref={refButton} className={className} $variant={variant} $width={sizes[size]} {...rest}>
			{children}
		</S.Button>
	);
});
