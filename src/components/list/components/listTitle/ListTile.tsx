import { Text } from "@src/components/text/Text";
import * as S from "./ListTitle.styles";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	children?: string;
}

export const ListTitle = ({ children, ...rest }: Props) => {
	return (
		<S.ListTitle {...rest}>
			<Text color="normalFg" bgcolor="transparent">
				{children}
			</Text>
		</S.ListTitle>
	);
};
