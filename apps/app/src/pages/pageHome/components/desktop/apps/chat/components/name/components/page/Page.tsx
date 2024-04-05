import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Talk } from "./components/talk/Talk";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useWebSocket } from "../../../../webSocket/UseWebSocket";
import { useState } from "react";
import { IClient, IMessage, IDataGet } from "../../../../Chat.types";

interface Props {
	name: string;
}

export const Page = ({ name }: Props) => {
	const navigator = useNavigator();

	const { sendMessage } = useWebSocket({ url: "ws://localhost:8080", onMessage: (message) => handleOnMessage(message) });

	const [client, setClient] = useState<IClient>({ clientId: "", clientName: "" });
	const [clients, setClients] = useState<IClient[]>([]);
	const [messages, setMessages] = useState<IMessage[]>([]);

	const handleOnMessage = (data: IDataGet) => {
		if (data.action === "CONNECTED") {
			setClient({ clientId: data.clientId, clientName: name });

			sendMessage({ action: "NAME", clientName: name });
		}

		if (data.action === "UPDATE") {
			const myClient = data.clients.find((item) => item.clientId === client.clientId);

			if (myClient) {
				setClient({ ...client, clientName: myClient.clientName });
			}

			setClients(data.clients);
			setMessages(data.messages);
		}
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
