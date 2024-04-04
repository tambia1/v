import WebSocket, { WebSocketServer } from "ws";

const clients = {};

const action = {
	CONNECTED: "CONNECTED",
	CONNECTION: "CONNECTION",
	NAME: "NAME",
	MESSAGE: "MESSAGE",
};

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
	const ip = req.socket.remoteAddress;

	ws.clientId = Date.now();
	ws.clientName = ws.clientId;

	console.log("connection client ip: " + ip + ", id: " + ws.clientId);

	//save client
	clients[ws.clientId] = ws.clientName;

	//send to the client his id
	ws.send(JSON.stringify({ action: action.CONNECTED, clientId: ws.clientId, clientName: ws.clientName }));

	//send to all clients that we have new connection
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ action: action.CONNECTION, clientId: ws.clientId, clientName: ws.clientName, clients: clients }));
		}
	});

	//on error
	ws.on("error", () => {
		console.log("error");
	});

	//on client disconnect
	ws.on("disconnect", () => {
		console.log("disconnect");
	});

	//on message from client
	ws.on("message", (message) => {
		let data = { action: "" };

		try {
			data = JSON.parse(message);
		} catch (error) {
			console.log("Client sent invalid message" + message);

			return;
		}

		console.log("Client sent the server: " + JSON.stringify(data));

		//send to all clients the message (except to himself)
		switch (data.action) {
			case action.NAME: {
				ws.clientName = data.clientName;
				clients[ws.clientId] = ws.clientName;

				wss.clients.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({ action: action.NAME, clientId: ws.clientId, clientName: ws.clientName, clients: clients }));
					}
				});

				break;
			}

			case action.MESSAGE: {
				wss.clients.forEach((client) => {
					if (client != ws && client.readyState === WebSocket.OPEN) {
						client.send(JSON.stringify({ action: action.MESSAGE, clientId: ws.clientId, clientName: ws.clientName, message: data.message }));
					}
				});

				break;
			}
		}
	});
});

console.log("WebSockets Server Running");
