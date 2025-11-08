import { useCallback, useEffect, useRef, useState } from "react";
import type { AvatarType } from "../avatar/Avatar.styles";
import * as S from "./Talk.styles";
import { BubbleMe } from "./bubbleMe/BubbleMe";
import { BubbleOther } from "./bubbleOther/BubbleOther";
import { MessageBar } from "./messageBar/MessageBar";
import { useLoggerStore } from "../../../../../debug/Debug";
import { Client, Message } from "./Talk.types";
import config from "@src/config.json";
import { useWebSocket } from "../../../../hooks/UseWebSocket";
import { Modal } from "@src/components/modal/Modal";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

const HOST = config.chat.host;

type Props = {
	name: string;
	avatar: number;
};

export const Talk = ({ name, avatar }: Props) => {
	const messagesRef = useRef<HTMLDivElement>(null);
	const addLog = useLoggerStore((state) => state.addLog);

	const [client, setClient] = useState<Client>({ clientId: "", clientName: name, clientAvatar: avatar });
	const [messages, setMessages] = useState<Message[]>([]);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const { sendMessage } = useWebSocket({
		url: `wss://${HOST}/`,
		onOpen: (event: Event) => {
			addLog(`handleOnOpen ${event.type}`);
		},
		onClose: (event: CloseEvent) => {
			addLog(`handleOnClose ${event.type}, ${event.code}, ${event.reason}`);
		},
		onError: (event: Event) => {
			addLog(`handleOnError: ${event.type}`);
			setIsModalVisible(true);
		},
		onMessage: (event: MessageEvent) => {
			const messagesFromServer: Message[] = JSON.parse(event.data as string);

			addLog(`handleOnMessage ${JSON.stringify(messagesFromServer)}`);

			setMessages(messagesFromServer);
		},
	});

	useEffect(() => {
		messagesRef.current?.scrollTo({ behavior: "smooth", top: messagesRef.current.scrollHeight });
	}, []);

	const handleOnClickSend = (message: string) => {
		if (message.trim().length > 0) {
			const data = { action: "message", message };

			sendMessage(JSON.stringify(data));
		}
	};

	const handleOnClickModalOk = () => {
		setIsModalVisible(false);
	};

	return (
		<>
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

			<Modal
				isVisible={isModalVisible}
				iconName="question"
				description={<T>{lang.all.error}</T>}
				onClickBackground={handleOnClickModalOk}
				buttons={[
					{
						content: <T>{lang.all.ok}</T>,
						onClick: handleOnClickModalOk,
					},
				]}
			/>
		</>
	);
};
