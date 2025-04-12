import { ReactNode } from "react";
import * as S from "./Body.styles";

export type Props = {
	content: ReactNode;
	collapsed: boolean;
};

export const Body = ({ content: children, collapsed }: Props) => {
	return (
		<S.Body $collapsed={collapsed}>
			<S.Content>{children}</S.Content>
		</S.Body>
	);
};
