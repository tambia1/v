import { Text } from "@src/components/text/Text";
import * as S from "./Value.styles";

type Props = {
	val: string | number;
};

export const Value = ({ val }: Props) => {
	return (
		<S.Value>
			<Text>{val}</Text>
		</S.Value>
	);
};
