import { Text } from "@src/components/text/Text";
import type { ReactNode } from "react";
import * as S from "./Value.styles";

type Props = {
	children?: ReactNode;
};

export const Value = ({ children }: Props) => {
	return (
		<S.Value>
			<Text>{children}</Text>
		</S.Value>
	);
};
