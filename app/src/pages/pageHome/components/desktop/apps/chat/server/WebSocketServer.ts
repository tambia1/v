import fs from "node:fs";
import { log } from "@src/utils/Terminal";
import https from "https";
import WebSocket, { WebSocketServer } from "ws";
import config from "./../../../../../../../config.json";

const HOST: string = "0.0.0.0";
const PORT: number = config.chat.port;

type Message = {
	clientId: string;
	clientName: string;
	clientAvatar: number;
	time: number;
	messageId: string;
	message: string;
};

const messages: Message[] = [];

const server = https.createServer(
	{
		key: fs.readFileSync("key.pem"),
		cert: fs.readFileSync("cert.pem"),
	},
	(req, res) => {
		if (req.url === "/" && req.method === "GET") {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("chat server live");
		} else {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
		}
	},
);

server.listen(PORT, HOST, () => {
	log("green", `WebSockets server running at wss://[${HOST}]:${PORT}`);
});

const wss = new WebSocketServer({ server });

interface ExtendedWebSocket extends WebSocket {
	clientId: string;
	clientTime: number;
	clientName: string;
	clientAvatar: number;
}

wss.on("error", (error: Error) => {
	log("red", `${error}`);
});

wss.on("connection", (ws: ExtendedWebSocket, req) => {
	const ip = req.socket.remoteAddress;

	ws.clientId = getUniqueId();
	ws.clientTime = Date.now();
	ws.clientName = ws.clientId;
	ws.clientAvatar = 0;

	log("blue", `connection, id: ${ws.clientId}, ip: ${ip} [${wss.clients.size}]`);

	ws.send(JSON.stringify({ action: "connected", clientId: ws.clientId, messages: messages }));

	ws.on("error", (err: Error) => {
		log("red", `error: ${err.message}`);
	});

	ws.on("close", () => {
		log("cyan", `disconnect [${wss.clients.size}]`);

		const message: Message = {
			messageId: getUniqueId(),
			time: Date.now(),
			clientId: ws.clientId,
			clientName: ws.clientName,
			clientAvatar: ws.clientAvatar,
			message: "Disconnected",
		};

		messages.push(message);

		if (messages.length > 100) {
			messages.shift();
		}

		ws.send(JSON.stringify({ action: "message", clientId: ws.clientId, messages: messages }));
	});

	ws.on("message", (messageReceived: string) => {
		try {
			const data = JSON.parse(messageReceived);

			log("yellow", `Client sent message: ${ws.clientId} "${ws.clientName}" ${JSON.stringify(data)}`);

			if (data.action === "clientDetails") {
				ws.clientName = data.clientName;
				ws.clientAvatar = data.clientAvatar;
				data.message = "Connected";
			}

			const message: Message = {
				messageId: getUniqueId(),
				time: Date.now(),
				clientId: ws.clientId,
				clientName: ws.clientName,
				clientAvatar: ws.clientAvatar,
				message: data.message,
			};

			messages.push(message);

			if (messages.length > 100) {
				messages.shift();
			}

			wss.clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					const extendedClient = client as ExtendedWebSocket;

					extendedClient.send(JSON.stringify({ action: "message", clientId: extendedClient.clientId, messages: messages }));
				}
			});
		} catch (_error) {
			log("red", `Client sent invalid message: ${messageReceived}`);
		}
	});
});

function getUniqueId(): string {
	const getRandomNumber = (): string => {
		return Math.floor(Math.random() * 1_000_0)
			.toString()
			.padStart(4, "0");
	};

	return `${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
}
