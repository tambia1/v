import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { IDataSend } from "../../../../../../Chat.types";
import { useStoreTalk } from "../../../../stores/StoreTalk";

interface Props {
	sendMessage: (message: IDataSend) => void;
}

export const Talk = ({ sendMessage }: Props) => {
	const { client, messages } = useStoreTalk();

	const handleOnClickSend = (message: string) => {
		if (message.trim().length > 0) {
			sendMessage({ action: "MESSAGE", message });
		}
	};

	return (
		<S.Talk>
			<S.Messages>
				{messages.map((message) => (
					<S.Message key={message.messageId}>
						{message.clientId === client.clientId && <BubbleMe key={message.messageId} content={message.message} />}
						{message.clientId !== client.clientId && <BubbleOther key={message.messageId} content={message.message} />}
					</S.Message>
				))}
			</S.Messages>

			<MessageBar onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
