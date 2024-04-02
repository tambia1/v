import * as S from "./Talk.styles";
import { Text } from "@src/components/text/Text";
import { MessageBar } from "./messageBar/MessageBar";

export const Talk = () => {
	return (
		<S.Talk>
			<S.Messages>
				<Text size="l">abcd</Text>
			</S.Messages>

			<MessageBar onClickSend={() => {}} />
		</S.Talk>
	);
};
