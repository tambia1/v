import type { HTMLAttributes } from "react";
import * as S from "./Body.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	collapsed: boolean;
};

export const Body = ({ children, collapsed, ...rest }: Props) => {
	return (
		<S.Body $collapsed={collapsed} {...rest}>
			<S.Content>{children}</S.Content>
		</S.Body>
	);
};
