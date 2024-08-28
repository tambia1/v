import WebSocket, { WebSocketServer, ServerOptions } from "ws";
import { log } from "./Log";
import config from "./../../../../../../../config.json";

const HOST: string = config.host;
const PORT: number = config.chat.port;

type Message = {
	messageId: string;
	time: number;
	clientId: string;
	clientName: string;
	message: string;
};

type MessageSend =
	| {
			action: "connected";
			clientId: string;
			clientName: string;
	  }
	| {
			action: "update";
			clients: {
				clientId: string;
				clientName: string;
			}[];
			messages: Message[];
	  };

type MessageGet =
	| {
			action: "name";
			clientId: string;
			clientName: string;
	  }
	| {
			action: "message";
			clients: {
				clientId: string;
				clientName: string;
			}[];
			message: string;
	  };

const messages: Message[] = [];

const wssOptions: ServerOptions = { host: HOST, port: PORT };
const wss = new WebSocketServer(wssOptions);

interface ExtendedWebSocket extends WebSocket {
	clientId: string;
	clientTime: number;
	clientName: string;
}

wss.on("error", (error: Error) => {
	log("red", `${error}`);
});

wss.on("connection", (ws: ExtendedWebSocket, req) => {
	const ip = req.socket.remoteAddress;

	ws.clientId = getUniqueId();
	ws.clientTime = Date.now();
	ws.clientName = ws.clientId;

	log("blue", `client connected, id: ${ws.clientId}, ip: ${ip}`);

	const message: MessageSend = {
		action: "connected",
		clientId: ws.clientId,
		clientName: ws.clientName,
	};

	ws.send(JSON.stringify(message));

	updateAllClients();

	ws.on("error", (err: Error) => {
		log("red", `error: ${err.message}`);
	});

	ws.on("close", () => {
		log("cyan", "disconnect");
	});

	ws.on("message", (message: string) => {
		let data: MessageGet;

		try {
			data = JSON.parse(message);
		} catch (error) {
			log("red", `Client sent invalid message: ${message}`);
			return;
		}

		log("yellow", `Client sent message: ${ws.clientId} ${JSON.stringify(data)}`);

		switch (data.action) {
			case "name":
				ws.clientName = data.clientName;
				updateAllClients();
				break;

			case "message":
				const message: Message = {
					messageId: getUniqueId(),
					time: Date.now(),
					clientId: ws.clientId,
					clientName: ws.clientName,
					message: data.message,
				};

				messages.push(message);

				if (messages.length > 100) {
					messages.shift();
				}

				updateAllClients();
				break;
		}
	});
});

function updateAllClients() {
	const clients = [...wss.clients].map((client) => {
		const extendedClient = client as ExtendedWebSocket;
		return { clientId: extendedClient.clientId, clientName: extendedClient.clientName };
	});

	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			const extendedClient = client as ExtendedWebSocket;
			const messageToSend: MessageSend = {
				action: "update",
				clients,
				messages,
			};

			extendedClient.send(JSON.stringify(messageToSend));
		}
	});
}

function getUniqueId(): string {
	const getRandomNumber = (): string => {
		return Math.floor(Math.random() * 1_000_0)
			.toString()
			.padStart(4, "0");
	};

	return `${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
}

log("green", `WebSockets server running at port ${PORT}`);
