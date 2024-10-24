import type { HTMLAttributes, ReactNode } from "react";
import { useContextMenu } from "../../context/UsePopupMenu";
import * as S from "./Button.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
};

export const Button = ({ children }: Props) => {
	const context = useContextMenu();

	return <S.Button ref={context.refButton}>{children}</S.Button>;
};
