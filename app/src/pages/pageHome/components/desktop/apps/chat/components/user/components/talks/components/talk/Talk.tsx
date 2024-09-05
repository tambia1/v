import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { useStoreTalk } from "../../../../stores/StoreTalk";
import { useEffect, useRef } from "react";
import { IAvatar } from "../../../avatar/Avatar.styles";

interface Props {
	sendMessage: (message: string) => void;
}

export const Talk = ({ sendMessage }: Props) => {
	const { client, messages } = useStoreTalk();
	const messagesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesRef.current?.scrollTo({ behavior: "smooth", top: messagesRef.current.scrollHeight });
	}, [messages]);

	const handleOnClickSend = (message: string) => {
		if (message.trim().length > 0) {
			const data = { action: "message", message };

			sendMessage(JSON.stringify(data));
		}
	};

	return (
		<S.Talk>
			<S.Messages ref={messagesRef}>
				{messages.map((message) => (
					<S.Message key={message.messageId}>
						{message.clientId === client.clientId && <BubbleMe key={message.messageId} content={message.message} avatar={message.clientAvatar as unknown as IAvatar} />}
						{message.clientId !== client.clientId && <BubbleOther key={message.messageId} content={message.message} avatar={message.clientAvatar as unknown as IAvatar} />}
					</S.Message>
				))}
			</S.Messages>

			<MessageBar onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
