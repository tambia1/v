import * as S from "./Page.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Talk } from "./components/talk/Talk";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useWebSocket } from "../../../../hooks/UseWebSocket";
import { useState } from "react";
import { IClient, IDataGet } from "../../../../Chat.types";
import { useStoreTalk } from "../../stores/StoreTalk";

interface Props {
	name: string;
}

export const Page = ({ name }: Props) => {
	const navigator = useNavigator();

	const { sendMessage } = useWebSocket({ url: "ws://localhost:5002", onMessage: (message) => handleOnMessage(message) });

	const [client, setClient] = useState<IClient>({ clientId: "", clientName: "" });
	const [clients, setClients] = useState<IClient[]>([]);

	const storeTalk = useStoreTalk();

	const handleOnMessage = (data: IDataGet) => {
		if (data.action === "CONNECTED") {
			setClient({ clientId: data.clientId, clientName: name });

			if (name.trim().length > 0) {
				sendMessage({ action: "NAME", clientName: name });
				storeTalk.setClient({ clientId: data.clientId, clientName: name });
			}
		}

		if (data.action === "UPDATE") {
			const myClient = data.clients.find((item) => item.clientId === client.clientId);

			if (myClient) {
				setClient({ ...client, clientName: myClient.clientName });
				storeTalk.setClient({ clientId: myClient.clientId, clientName: myClient.clientName });
			}

			setClients(data.clients);
			storeTalk.setMessages(data.messages);
		}
	};

	const handleOnClickCell = (_client: IClient) => {
		navigator.pushPage(
			<Navigator.Page id="talk" title={"Group"}>
				<Talk sendMessage={sendMessage} />
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
