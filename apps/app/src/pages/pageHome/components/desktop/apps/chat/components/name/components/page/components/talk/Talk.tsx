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

export const Talk = ({ client, messages, sendMessage }: Props) => {
	const handleOnClickSend = (message: string) => {
		sendMessage({ action: "MESSAGE", message });
	};

	return (
		<S.Talk>
			<S.Messages>
				{messages.map((message) =>
					message.clientId === client.clientId ? <BubbleMe key={message.clientId} content={message.message} /> : <BubbleOther key={message.clientId} content={message.message} />
				)}
			</S.Messages>

			<MessageBar onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
