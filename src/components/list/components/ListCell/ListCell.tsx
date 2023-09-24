import * as S from "./ListCell.styles";
import { ReactNode } from "react";

interface Props {
	$isEnabled?: boolean;
	$isSelected?: boolean;
	children?: ReactNode;
}

export const ListCell = ({ children, $isEnabled: isEnabled, $isSelected: isSelected, ...rest }: Props) => {
	return (
		<S.Container $isEnabled={isEnabled ?? true} $isSelected={isSelected ?? false} {...rest}>
			<S.Text>{children}</S.Text>
			<S.Line />
		</S.Container>
	);
};
