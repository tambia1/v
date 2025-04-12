import type { ReactNode } from "react";
import * as S from "./Footer.styles";

export type Props = {
	content: ReactNode;
};

export const Footer = ({ content }: Props) => {
	if (!content) {
		return null;
	}

	return (
		<S.Footer>
			<S.FooterContent>{content}</S.FooterContent>
		</S.Footer>
	);
};
