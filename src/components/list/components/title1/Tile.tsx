import { Text } from "@src/components/text/Text";
import * as S from "./Title.styles";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	children?: string;
}

export const Title = ({ children, ...rest }: Props) => {
	return (
		<S.Title {...rest}>
			<Text color="normalFg" bgcolor="transparent">
				{children}
			</Text>
		</S.Title>
	);
};
