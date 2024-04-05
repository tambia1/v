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
import { IClient, IMessage } from "../../../../Chat.types";

export const Page = () => {
	const navigator = useNavigator();
	const storeChat = StoreChat();

	const { sendMessage } = useWebSocket({ url: "ws://localhost:8080", onMessage: (message) => handleOnMessage(message) });

	const [clients, setCLients] = useState<IClient[]>([]);
	const [client, setClient] = useState<IClient>({ clientId: "", clientName: "" });

	const handleOnMessage = (message: string) => {
		const data: IMessage = JSON.parse(message);

		if (data.action === "CONNECTED") {
			setClient({ clientId: data.clientId, clientName: storeChat.name });
			sendMessage({ action: "NAME", clientName: storeChat.name });
		}

		if (data.action === "CONNECTION" || data.action === "CLIENTS") {
			setCLients(data.clients);
		}

		console.log("onMessage", message);
	};

	const handleOnClickCell = (_client: IClient) => {
		navigator.pushPage(
			<Navigator.Page id="talk" title={"Group"}>
				<Talk client={client} sendMessage={sendMessage} />
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
						{client.clientName} {client.clientId}
					</List.Cell>
				))}
			</List>
		</S.Page>
	);
};
