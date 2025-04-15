import { type Touch, useTouch } from "@src/hooks/UseTouch";
import type { Theme } from "@src/theme/Theme.types";
import type { ComponentProps } from "react";
import * as S from "./Button.styles";

export type Variant = "styled" | "full" | "stroke" | "link" | "text" | "none";

export type Props = ComponentProps<"button"> & {
	className?: string;
	variant?: Variant;
	onLongClick?: (e: TouchEvent | MouseEvent) => void;
	size?: keyof Theme["size"];
};

export const Button = ({ className, children, variant = "styled", size = "size700", onLongClick, ref, ...rest }: Props) => {
	useTouch({
		ref: ref,
		onTouch: ({ status, e }: Touch) => {
			if (status === "long") {
				onLongClick?.(e);
			}
		},
	});

	return (
		<S.Button ref={ref} className={className} $variant={variant} $width={size} {...rest}>
			{children}
		</S.Button>
	);
};
