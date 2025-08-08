import http from "node:http";
import url from "node:url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./../../../../../../../config.json" with { type: "json" };

const HOST = "localhost";
const PORT = config.serverAi.port;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Store conversation history
const conversations = new Map();

// Logging utility
const log = (color, message) => {
	const colors = {
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		cyan: "\x1b[36m",
		reset: "\x1b[0m",
	};
	console.log(`${colors[color] || ""}${message}${colors.reset}`);
};

// Helper function to get request body
const getRequestBody = (req) => {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			try {
				resolve(JSON.parse(body));
			} catch (error) {
				reject(error);
			}
		});
	});
};

// Routes
const routes = {
	GET: {
		"/": (_req, res) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/plain");
			res.end("AI server running with Gemini API");
		},
		"/health": (_req, res) => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ status: "healthy", model: "gemini-1.5-flash" }));
		},
	},
	POST: {
		"/chat": async (req, res) => {
			try {
				const { message, conversationId = "default" } = await getRequestBody(req);

				log("green", `Received message: ${message}`);

				if (!message || !message.trim()) {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify({ error: "Message is required" }));
					return;
				}

				// Get or create conversation history
				if (!conversations.has(conversationId)) {
					conversations.set(conversationId, []);
				}
				const history = conversations.get(conversationId);

				// Add user message to history
				history.push({
					role: "user",
					parts: [{ text: message }],
				});

				// Start chat with history
				const chat = model.startChat({
					history: history.slice(0, -1), // Exclude the current message from history
				});

				// Send message and get response
				const result = await chat.sendMessage(message);
				const response = result.response;
				const responseText = response.text();

				// Add AI response to history
				history.push({
					role: "model",
					parts: [{ text: responseText }],
				});

				// Keep only last 20 messages to prevent memory issues
				if (history.length > 20) {
					history.splice(0, history.length - 20);
				}

				log("blue", `Response: ${responseText}`);

				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.end(
					JSON.stringify({
						response: responseText,
						conversationId,
						timestamp: Date.now(),
					}),
				);
			} catch (error) {
				log("red", `Error: ${error.message}`);
				res.statusCode = 500;
				res.setHeader("Content-Type", "application/json");
				res.end(
					JSON.stringify({
						error: "Failed to process message",
						details: error.message,
					}),
				);
			}
		},
		"/clear": async (req, res) => {
			try {
				const { conversationId = "default" } = await getRequestBody(req);

				conversations.delete(conversationId);

				log("yellow", `Cleared conversation: ${conversationId}`);

				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.end(
					JSON.stringify({
						message: "Conversation cleared",
						conversationId,
					}),
				);
			} catch (error) {
				log("red", `Error clearing conversation: ${error.message}`);
				res.statusCode = 500;
				res.setHeader("Content-Type", "application/json");
				res.end(
					JSON.stringify({
						error: "Failed to clear conversation",
						details: error.message,
					}),
				);
			}
		},
	},
};

// Create HTTP server
const server = http.createServer(async (req, res) => {
	const { method, url: reqUrl } = req;

	log("yellow", `${method} ${reqUrl}`);

	// CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	const { pathname } = url.parse(reqUrl);
	const routeHandler = routes[method]?.[pathname];

	if (routeHandler) {
		try {
			await routeHandler(req, res);
		} catch (error) {
			log("red", `Route handler error: ${error.message}`);
			res.statusCode = 500;
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ error: "Internal server error" }));
		}
	} else {
		res.statusCode = 404;
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ error: "Route not found" }));
	}
});

// Start server
server.listen(PORT, HOST, () => {
	log("green", `AI server running at http://[${HOST}]:${PORT}`);
	log("blue", `Using Gemini API key: ${process.env.GEMINI_API_KEY ? "Set" : "Not set"}`);
});

// Handle server errors
server.on("error", (error) => {
	log("red", `Server error: ${error.message}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
	log("yellow", "Shutting down AI server...");
	server.close(() => {
		log("yellow", "AI server stopped");
		process.exit(0);
	});
});
