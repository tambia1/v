import http from "node:http";
import url from "node:url";

import config from "./../../../../../../../config.json" with { type: "json" };

// ANSI color codes
const _colors = {
	green: "\x1b[32m",
	red: "\x1b[31m",
	reset: "\x1b[0m",
};

const PORT = config.serverAi.port;

const server = http.createServer((req, res) => {
	// Enable CORS
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight OPTIONS request
	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}

	const parsedUrl = url.parse(req.url, true);

	if (req.method === "POST" && parsedUrl.pathname === "/message") {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk.toString();
		});

		req.on("end", () => {
			try {
				// Parse the message from the request body
				const data = JSON.parse(body);
				const message = data.message;

				console.log(`${_colors.green}Received message: ${message}${_colors.reset}`);

				// Always respond with "hello"
				const responseMessage = "hello";
				console.log(`${_colors.red}Sending response: ${responseMessage}${_colors.reset}`);

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ response: responseMessage }));
			} catch (error) {
				console.error("Error parsing request:", error);
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Invalid JSON" }));
			}
		});
	} else {
		// Handle other routes
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Not found" }));
	}
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Accepting POST requests at http://localhost:${PORT}/message`);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.log("\nShutting down server...");
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
});
