import { ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	isVisible: boolean;
}

export const Compose = ({ isVisible, children, ...rest }: Props) => {
	return <>{isVisible && <S.Compose {...rest}>{children}</S.Compose>}</>;
};
