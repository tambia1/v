import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import type React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link" | "none";

export type Props = React.ComponentPropsWithoutRef<"button"> & {
	className?: string;
	variant?: IVariant;
	onLongClick?: (e: TouchEvent | MouseEvent) => void;
};

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, variant = "styled", onLongClick, ...rest }, ref) => {
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
		<S.Button ref={refButton} className={className} $variant={variant} {...rest}>
			{children}
		</S.Button>
	);
});
