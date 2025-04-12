import { ReactNode } from "react";
import * as S from "./Body.styles";

export type Props = {
	content?: ReactNode;
	collapsed?: boolean;
};

export const Body = ({ content, collapsed = false }: Props) => {
	if (!content) {
		return null;
	}

	return (
		<S.Body $collapsed={collapsed}>
			<S.Content>{content}</S.Content>
		</S.Body>
	);
};
