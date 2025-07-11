import { randomUUID } from "node:crypto";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import cors from "cors";
import express from "express";
import { z } from "zod";

import config from "./../../../../../../../config.json" with { type: "json" };

// ANSI color codes
const _colors = {
	green: "\x1b[32m",
	red: "\x1b[31m",
	reset: "\x1b[0m",
};

const PORT = config.serverAi.port;

// Create Express app
const app = express();
app.use(express.json());

// Configure CORS for browser-based MCP clients
app.use(
	cors({
		origin: "*", // Configure appropriately for production
		exposedHeaders: ["Mcp-Session-Id"],
		allowedHeaders: ["Content-Type", "mcp-session-id", "mcp-protocol-version", "Authorization", "Accept"],
	}),
);

// Map to store transports by session ID
const transports = {};

// Create MCP server instance
function createMcpServer() {
	const mcpServer = new McpServer({
		name: "testAi-mcp-server",
		version: "1.0.0",
	});

	// Register a simple echo tool
	mcpServer.registerTool(
		"echo",
		{
			title: "Echo Tool",
			description: "Echoes back the provided message",
			inputSchema: { message: z.string() },
		},
		async ({ message }) => {
			console.log(`${_colors.green}Tool called with message: ${message}${_colors.reset}`);
			const response = `Echo: ${message}`;
			console.log(`${_colors.red}Tool responding with: ${response}${_colors.reset}`);
			return {
				content: [{ type: "text", text: response }],
			};
		},
	);

	// Register a greeting resource
	mcpServer.registerResource(
		"greeting",
		new ResourceTemplate("greeting://{name}", { list: undefined }),
		{
			title: "Greeting Resource",
			description: "Dynamic greeting generator",
		},
		async (uri, { name }) => {
			console.log(`${_colors.green}Resource requested for name: ${name}${_colors.reset}`);
			const greeting = `Hello, ${name}! Welcome to the MCP testAi server.`;
			console.log(`${_colors.red}Resource responding with: ${greeting}${_colors.reset}`);
			return {
				contents: [
					{
						uri: uri.href,
						text: greeting,
					},
				],
			};
		},
	);

	// Register a conversation prompt
	mcpServer.registerPrompt(
		"chat",
		{
			title: "Chat Prompt",
			description: "Creates a chat prompt with the provided message",
			argsSchema: { message: z.string() },
		},
		({ message }) => {
			console.log(`${_colors.green}Prompt requested with message: ${message}${_colors.reset}`);
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Please respond to this message: ${message}`,
						},
					},
				],
			};
		},
	);

	return mcpServer;
}

// Add debug middleware
app.use((req, _res, next) => {
	console.log(`${_colors.green}${req.method} ${req.path}${_colors.reset}`);
	next();
});

// Handle POST requests for client-to-server communication
app.post("/mcp", async (req, res) => {
	console.log(`${_colors.green}POST /mcp received${_colors.reset}`);
	// Check for existing session ID
	const sessionId = req.headers["mcp-session-id"];
	let transport;

	if (sessionId && transports[sessionId]) {
		// Reuse existing transport
		transport = transports[sessionId];
	} else if (!sessionId && isInitializeRequest(req.body)) {
		// New initialization request
		transport = new StreamableHTTPServerTransport({
			sessionIdGenerator: () => randomUUID(),
			onsessioninitialized: (sessionId) => {
				// Store the transport by session ID
				transports[sessionId] = transport;
			},
			// DNS rebinding protection is disabled by default for backwards compatibility
			enableDnsRebindingProtection: false,
		});

		// Clean up transport when closed
		transport.onclose = () => {
			if (transport.sessionId) {
				delete transports[transport.sessionId];
			}
		};

		const mcpServer = createMcpServer();

		// Connect to the MCP server
		await mcpServer.connect(transport);
	} else {
		// Invalid request
		res.status(400).json({
			jsonrpc: "2.0",
			error: {
				code: -32000,
				message: "Bad Request: No valid session ID provided",
			},
			id: null,
		});
		return;
	}

	// Handle the request
	await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = async (req, res) => {
	const sessionId = req.headers["mcp-session-id"];
	if (!sessionId || !transports[sessionId]) {
		res.status(400).send("Invalid or missing session ID");
		return;
	}

	const transport = transports[sessionId];
	await transport.handleRequest(req, res);
};

// Handle GET requests for server-to-client notifications via SSE
app.get("/mcp", handleSessionRequest);

// Handle DELETE requests for session termination
app.delete("/mcp", handleSessionRequest);

// Catch-all route for debugging
app.use((req, res) => {
	console.log(`${_colors.red}Unhandled route: ${req.method} ${req.originalUrl}${_colors.reset}`);
	res.status(404).json({ error: "Not found" });
});

// Start the server
app.listen(PORT, () => {
	console.log(`MCP Server running on port ${PORT}`);
	console.log(`MCP endpoint available at http://localhost:${PORT}/mcp`);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.log("\nShutting down MCP server...");
	// Close all transports
	Object.values(transports).forEach((transport) => {
		if (transport && typeof transport.close === "function") {
			transport.close();
		}
	});
	process.exit(0);
});
