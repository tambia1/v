import type { HTMLAttributes, ReactNode } from "react";
import * as S from "./Collapsable.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children?: ReactNode;
	collapsed: boolean;
};

export const Collapsable = ({ className, children, collapsed, ...rest }: Props) => {
	return (
		<S.Collapsable className={className} $collapsed={collapsed} {...rest}>
			<S.Content>{children}</S.Content>
		</S.Collapsable>
	);
};
