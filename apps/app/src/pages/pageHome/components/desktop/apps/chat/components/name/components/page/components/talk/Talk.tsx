import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { useState } from "react";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { IClient, IMessage } from "../../../../../../Chat.types";

interface Props {
	client: IClient;
	sendMessage: (message: IMessage) => void;
}

export const Talk = ({ client, sendMessage }: Props) => {
	const [messages, setMessages] = useState<IMessage[]>([]);

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

		setMessages([...messages, message]);
		sendMessage(message);
	};

	return (
		<S.Talk>
			<S.Messages>
				{messages.map((message) => {
					if (message.action === "MESSAGE") {
						return message.clientId === client.clientId ? (
							<BubbleMe key={message.clientId} content={message.content} status={message.status} />
						) : (
							<BubbleOther key={message.clientId} content={message.content} status={message.status} />
						);
					}

					return <></>;
				})}
			</S.Messages>

			<MessageBar message="" onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
