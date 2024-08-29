import { useCounterContext } from "../contexts/Counter.context";
import * as S from "./Value.styles";
import { Text } from "@src/components/text/Text";

export const Value = () => {
	const counterContext = useCounterContext();

	return (
		<S.Value>
			<Text>{counterContext.value}</Text>
		</S.Value>
	);
};
