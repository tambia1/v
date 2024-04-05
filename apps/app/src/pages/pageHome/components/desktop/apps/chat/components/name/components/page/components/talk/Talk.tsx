import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { IClient, IContent, IMessage } from "../../../../../../Chat.types";

interface Props {
	client: IClient;
	messages: IContent[];
	sendMessage: (message: IMessage) => void;
}

export const Talk = ({ client, messages, sendMessage }: Props) => {
	const handleOnClickSend = (content: string) => {
		const message: IMessage = {
			action: "MESSAGE",
			clientId: "",
			clientName: "",
			contentId: "",
			status: "SENT",
			time: Date.now(),
			content: content,
		};

		sendMessage(message);
	};

	return (
		<S.Talk>
			<S.Messages>
				{messages.map((message) =>
					message.clientId === client.clientId ? <BubbleMe key={message.clientId} content={message.message} /> : <BubbleOther key={message.clientId} content={message.message} />
				)}
			</S.Messages>

			<MessageBar message="" onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
