import * as S from "./Talk.styles";
import { MessageBar } from "./messageBar/MessageBar";
import { useState } from "react";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { getUniqueId } from "@src/utils/UniqueId";

type IMessage = {
	id: string;
	senderId: string;
	time: number;
	content: string;
	status: string;
};

export const Talk = () => {
	const [messages, setMessages] = useState<IMessage[]>([
		{
			id: getUniqueId(),
			senderId: "1",
			time: Date.now(),
			content: "Hi, how are you doing?",
			status: "sent",
		},
		{
			id: getUniqueId(),
			senderId: "0",
			time: Date.now(),
			content: "Great, and you?",
			status: "sent",
		},
		{
			id: getUniqueId(),
			senderId: "1",
			time: Date.now(),
			content: "Splendid!",
			status: "sent",
		},
	]);

	const handleOnClickSend = (content: string) => {
		const message: IMessage = {
			id: getUniqueId(),
			senderId: "0",
			time: Date.now(),
			content,
			status: "sent",
		};

		setMessages([...messages, message]);
	};

	return (
		<S.Talk>
			<S.Messages>
				{messages.map((message) =>
					message.senderId === "0" ? (
						<BubbleMe key={message.id} content={message.content} status={message.status} />
					) : (
						<BubbleOther key={message.id} content={message.content} status={message.status} />
					)
				)}
			</S.Messages>

			<MessageBar onClickSend={handleOnClickSend} />
		</S.Talk>
	);
};
