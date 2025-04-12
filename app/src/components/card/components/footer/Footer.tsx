import type { ReactNode } from "react";
import * as S from "./Footer.styles";

export type Props = {
	children: ReactNode;
};

export const Footer = ({ children }: Props) => {
	if (!children) {
		return null;
	}

	return (
		<S.Footer>
			<S.FooterContent>{children}</S.FooterContent>
		</S.Footer>
	);
};
