import * as S from "./Talks.styles";
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
import config from "@src/config.json";
import { Avatar } from "../avatar/Avatar";
import { IAvatar } from "../avatar/Avatar.styles";
import { logger } from "../../../../../debug/Debug";

const HOST = config.host;
const PORT = config.chat.port;

interface Props {
	name: string;
	avatar: number;
}

export const Talks = ({ name, avatar }: Props) => {
	const navigator = useNavigator();

	const { sendMessage } = useWebSocket({
		url: `ws://[${HOST}]:${PORT}`,
		onMessage: (message) => handleOnMessage(message),
		onError: (event) => handleOnError(event),
		onOpen: () => handleOnOpen(),
		onClose: () => handleOnClose(),
	});

	const [client, setClient] = useState<IClient>({ clientId: "", clientName: "", clientAvatar: 0 });
	const [clients, setClients] = useState<IClient[]>([]);

	const storeTalk = useStoreTalk();

	const handleOnMessage = (data: IDataGet) => {
		logger(`handleOnMessage ${JSON.stringify(data)}`);

		if (data.action === "connected") {
			setClient({ clientId: data.clientId, clientName: name, clientAvatar: avatar });

			if (name.trim().length > 0) {
				sendMessage({ action: "name", clientName: name, clientAvatar: avatar });
				storeTalk.setClient({ clientId: data.clientId, clientName: name, clientAvatar: avatar });
			}
		}

		if (data.action === "update") {
			const myClient = data.clients.find((item) => item.clientId === client.clientId);

			if (myClient) {
				setClient({ ...client, clientName: myClient.clientName, clientAvatar: myClient.clientAvatar });
				storeTalk.setClient({ clientId: myClient.clientId, clientName: myClient.clientName, clientAvatar: myClient.clientAvatar });
			}

			setClients(data.clients);
			storeTalk.setMessages(data.messages);
		}
	};

	const handleOnError = (event: Event) => {
		logger(`handleOnError: ${JSON.stringify(event)}`);
	};

	const handleOnOpen = () => {
		logger(`handleOnOpen`);
	};

	const handleOnClose = () => {
		logger(`handleOnClose`);
	};

	const handleOnClickCell = (_client: IClient) => {
		navigator.pushPage(
			<Navigator.Page id="talk" title={"Group"}>
				<Talk sendMessage={sendMessage} />
			</Navigator.Page>
		);
	};

	return (
		<S.Talks>
			<List.Section>
				<T>{lang.chat.talks}</T>
			</List.Section>

			<List>
				{clients.map((client) => (
					<List.Cell key={client.clientId} onClick={() => handleOnClickCell(client)}>
						<Avatar index={client.clientAvatar as unknown as IAvatar} size="s" />
						<S.ClientName>{client.clientName}</S.ClientName>
						<S.ClientId>{client.clientId}</S.ClientId>
					</List.Cell>
				))}
			</List>
		</S.Talks>
	);
};
