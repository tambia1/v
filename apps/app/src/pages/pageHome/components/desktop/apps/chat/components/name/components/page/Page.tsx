import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Talk } from "./components/talk/Talk";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useWebSocket } from "../../../../webSocket/UseWebSocket";
import { StoreChat } from "../../stores/StoreChat";
import { useState } from "react";
import { IClient, IContent, IMessage } from "../../../../Chat.types";

export const Page = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();

	const { sendMessage } = useWebSocket({ url: "ws://localhost:8080", onMessage: (message) => handleOnMessage(message) });

	const [client, setClient] = useState<IClient>({ clientId: "", clientName: "" });
	const [clients, setCLients] = useState<IClient[]>([]);
	const [messages, setMessages] = useState<IContent[]>([]);

	const handleOnMessage = (message: string) => {
		const data: IMessage = JSON.parse(message);

		if (data.action === "CONNECTED") {
			setClient({ clientId: data.clientId, clientName: storeChat.name });
			sendMessage({ action: "NAME", clientName: storeChat.name });
		}

		if (data.action === "CONNECTION") {
			setCLients(data.clients);
		}

		if (data.action === "NAMES") {
			setCLients(data.clients);
		}

		if (data.action === "MESSAGES") {
			setMessages(data.messages);
		}

		console.log("onMessage", message);
	};

	const handleOnClickCell = (_client: IClient) => {
		navigator.pushPage(
			<Navigator.Page id="talk" title={"Group"}>
				<Talk client={client} sendMessage={sendMessage} messages={messages} />
			</Navigator.Page>
		);
	};

	return (
		<S.Page>
			<List.Section>
				<T>{lang.chat.talks}</T>
			</List.Section>

			<List>
				{clients.map((client) => (
					<List.Cell key={client.clientId} onClick={() => handleOnClickCell(client)}>
						<S.ClientName>{client.clientName}</S.ClientName> <S.ClientId>{client.clientId}</S.ClientId>
					</List.Cell>
				))}
			</List>
		</S.Page>
	);
};
