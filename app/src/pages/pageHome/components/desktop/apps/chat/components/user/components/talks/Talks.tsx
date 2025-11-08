import { List } from "@src/components/list/List";
import { Modal } from "@src/components/modal/Modal";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import config from "@src/config.json";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useState } from "react";
import { useLoggerStore } from "../../../../../debug/Debug";
import type { Client, DataGet } from "../../../../Chat.types";
import { useWebSocket } from "../../../../hooks/UseWebSocket";
import { useStoreTalk } from "../../stores/StoreTalk";
import { Avatar } from "../avatar/Avatar";
import type { AvatarType } from "../avatar/Avatar.styles";
import { Talk } from "./components/talk/Talk";
import * as S from "./Talks.styles";

const HOST = config.chat.host;
const PORT = config.chat.port;

interface Props {
	name: string;
	avatar: number;
}

export const Talks = ({ name, avatar }: Props) => {
	const navigator = useNavigator();
	const addLog = useLoggerStore((state) => state.addLog);

	const { sendMessage } = useWebSocket({
		url: `wss://[${HOST}]:${PORT}/`,
		onMessage: (message) => handleOnMessage(message),
		onError: (event) => handleOnError(event),
		onOpen: (event) => handleOnOpen(event),
		onClose: (event) => handleOnClose(event),
	});

	const [client, setClient] = useState<Client>({ clientId: "", clientName: "", clientAvatar: 0 });
	const [clients, setClients] = useState<Client[]>([]);

	const storeTalk = useStoreTalk();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleOnOpen = (event: Event) => {
		addLog(`handleOnOpen ${event.type}`);
	};

	const handleOnClose = (event: CloseEvent) => {
		addLog(`handleOnClose ${event.type}, ${event.code}, ${event.reason}`);
	};

	const handleOnError = (event: Event) => {
		addLog(`handleOnError: ${event.type}`);
		setIsModalVisible(true);
	};

	const handleOnMessage = (event: MessageEvent) => {
		const data: DataGet = JSON.parse(event.data as string);

		addLog(`handleOnMessage ${JSON.stringify(data)}`);

		if (data.action === "connected") {
			setClient({ clientId: data.clientId, clientName: name, clientAvatar: avatar });

			if (name.trim().length > 0) {
				const message = { action: "name", clientName: name, clientAvatar: avatar };

				sendMessage(JSON.stringify(message));
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

	const handleOnClickCell = (_client: Client) => {
		navigator.pushPage(
			<Navigator.Page name="talk" title={"Group"}>
				<Talk sendMessage={sendMessage} />
			</Navigator.Page>,
		);
	};

	const handleOnClickModalOk = () => {
		setIsModalVisible(false);
		navigator.popPage();
	};

	return (
		<S.Talks>
			<List.Section>
				<T>{lang.chat.talks}</T>
			</List.Section>

			<List>
				{clients.map((client) => (
					<List.Cell key={client.clientId} onClick={() => handleOnClickCell(client)}>
						<Avatar index={client.clientAvatar as unknown as AvatarType} size="s" />
						<S.ClientName>{client.clientName}</S.ClientName>
						<S.ClientId>{client.clientId}</S.ClientId>
					</List.Cell>
				))}
			</List>

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
		</S.Talks>
	);
};
