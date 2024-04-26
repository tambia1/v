import WebSocket, { WebSocketServer } from "ws";

const actionSend = {
	CONNECTED: "CONNECTED",
	UPDATE: "UPDATE",
};

const actionGet = {
	NAME: "NAME",
	MESSAGE: "MESSAGE",
};

const messages = [];

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
	const ip = req.socket.remoteAddress;

	ws.clientId = getUniqueId();
	ws.clientTime = Date.now();
	ws.clientName = ws.clientId;

	logBlue("client connected, id: " + ws.clientId + ", ip: " + ip);

	//send to the client his id
	ws.send(JSON.stringify({ action: actionSend.CONNECTED, clientId: ws.clientId, clientName: ws.clientName }));

	//send to all clients that we have new connection
	updateAllClients();

	//on error
	ws.on("error", (err) => {
		logRed("error: " + err);
	});

	//on client disconnect
	ws.on("client disconnect", () => {
		logCyan("disconnect");
	});

	//on message from client
	ws.on("message", (message) => {
		let data = { action: "" };

		try {
			data = JSON.parse(message);
		} catch (error) {
			logRed("Client sent invalid message" + message);

			return;
		}

		logYellow("Client sent message: " + ws.clientId + " " + JSON.stringify(data));

		//send to all clients the message (except to himself)
		switch (data.action) {
			case actionGet.NAME: {
				ws.clientName = data.clientName;

				updateAllClients();

				break;
			}

			case actionGet.MESSAGE: {
				messages.push({ messageId: getUniqueId(), time: Date.now(), clientId: ws.clientId, clientName: ws.clientName, message: data.message });

				if (messages.length > 100) {
					messages.shift();
				}

				updateAllClients();

				break;
			}
		}
	});
});

function updateAllClients() {
	const clients = [...wss.clients].map((client) => ({ clientId: client.clientId, clientName: client.clientName }));

	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ action: actionSend.UPDATE, clients, messages }));
		}
	});
}

function getUniqueId() {
	const getRandomNumber = () => {
		return Math.floor(Math.random() * 1_000_0)
			.toString()
			.padStart(4, "0");
	};

	return `${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
}

function log(color, message) {
	console.log("\u001b[" + color + "m" + message + "\u001b[0m");
}

function logGrey(message) {
	log(30, message);
}

function logRed(message) {
	log(31, message);
}

function logGreen(message) {
	log(32, message);
}

function logYellow(message) {
	log(33, message);
}

function logBlue(message) {
	log(34, message);
}

function logPurple(message) {
	log(35, message);
}

function logCyan(message) {
	log(36, message);
}

logGreen("WebSockets Server Running");
