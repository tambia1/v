import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { IClient, IDataSend, IMessage } from "../../../../../../Chat.types";

interface Props {
	client: IClient;
	messages: IMessage[];
	sendMessage: (message: IDataSend) => void;
}

let count = 0;

export const Talk = ({ client, messages, sendMessage }: Props) => {
	const handleOnClickSend = (message: string) => {
		if (message.trim().length > 0) {
			sendMessage({ action: "MESSAGE", message });
		}
	};

	console.log("Talk", count++);

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
