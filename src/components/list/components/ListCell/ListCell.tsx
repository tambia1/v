import * as S from "./ListCell.styles";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

export const ListCell = ({ children, ...rest }: Props) => {
	return (
		<S.Container {...rest}>
			<S.Text>{children}</S.Text>
			<S.Line />
		</S.Container>
	);
};
