import { ReactNode } from "react";
import * as S from "./Collapsable.styles";

export interface Props {
	className?: string | undefined;
	children?: ReactNode;
	collapsed: boolean;
}

export const Collapsable = ({ className, children, collapsed, ...rest }: Props) => {
	return (
		<S.Collapsable className={className} $collapsed={collapsed} {...rest}>
			<S.Content>{children}</S.Content>
		</S.Collapsable>
	);
};
