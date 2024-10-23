import type { HTMLAttributes, ReactNode } from "react";
import * as S from "./Item.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode;
};

export const Item = ({ children, className, ...rest }: Props) => {
	return (
		<S.Item className={className} {...rest}>
			{children}
		</S.Item>
	);
};
