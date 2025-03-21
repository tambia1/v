import { useEffect, useRef } from "react";
import { useStoreTalk } from "../../../../stores/StoreTalk";
import type { AvatarType } from "../../../avatar/Avatar.styles";
import * as S from "./Talk.styles";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { MessageBar } from "./messageBar/MessageBar";

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
						{message.clientId === client.clientId && (
							<BubbleMe key={message.messageId} content={message.message} avatar={message.clientAvatar as unknown as AvatarType} />
						)}
						{message.clientId !== client.clientId && (
							<BubbleOther key={message.messageId} content={message.message} avatar={message.clientAvatar as unknown as AvatarType} />
						)}
					</S.Message>
				))}
			</S.Messages>

			<MessageBar onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
