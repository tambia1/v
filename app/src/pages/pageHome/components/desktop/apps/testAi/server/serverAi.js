import { randomUUID } from "node:crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
// Removed zod import - using JSON Schema instead
import dotenv from "dotenv";
import express from "express";
import config from "./../../../../../../../config.json" with { type: "json" };

// Load environment variables from .env file
dotenv.config();

// ANSI color codes
const _colors = {
	green: "\x1b[32m",
	red: "\x1b[31m",
	reset: "\x1b[0m",
};

const PORT = config.serverAi.port;

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "demo-key");

// Check if we have a real API key
const hasValidApiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "demo-key";

// Debug: Show API key status
console.log(`${_colors.green}🔑 API Key Status:${_colors.reset}`);
if (hasValidApiKey) {
	console.log(`${_colors.green}✅ Gemini API key is set (${process.env.GEMINI_API_KEY.substring(0, 10)}...)${_colors.reset}`);
} else {
	console.log(`${_colors.red}❌ No Gemini API key found. Set GEMINI_API_KEY environment variable.${_colors.reset}`);
}

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

// Global variable to store current tool call arguments
let currentToolArgs = {};

// AI Chat handler function
async function _handleAiChat(args) {
	const message = args?.message || "Hello";
	const model = args?.model || "gemini-1.5-flash";

	console.log(`${_colors.green}AI Chat called with message: ${message}${_colors.reset}`);

	// Check if we have a valid API key
	if (!hasValidApiKey) {
		const demoResponse = `🤖 Demo AI Response: I received your message "${message}". To get real AI responses, please set your GEMINI_API_KEY environment variable. You can get one from https://aistudio.google.com/app/apikey`;
		console.log(`${_colors.red}Demo response (no API key)${_colors.reset}`);
		return {
			content: [{ type: "text", text: demoResponse }],
		};
	}

	try {
		const model_instance = genAI.getGenerativeModel({ model: model });
		const prompt = `You are a helpful AI assistant integrated into an MCP server. Be concise and helpful.

User message: ${message}`;

		const result = await model_instance.generateContent(prompt);
		const response = result.response.text() || "Sorry, I couldn't generate a response.";
		console.log(`${_colors.red}AI responding with: ${response.substring(0, 100)}...${_colors.reset}`);

		return {
			content: [{ type: "text", text: response }],
		};
	} catch (error) {
		console.error("Gemini API error:", error);
		const fallbackResponse = `AI Chat Error: ${error.message}. Please check your GEMINI_API_KEY and try again.`;
		return {
			content: [{ type: "text", text: fallbackResponse }],
		};
	}
}

// Code Generation handler function
async function _handleCodeGeneration(args) {
	const description = args?.description || "Create a simple function";
	const language = args?.language || "javascript";

	console.log(`${_colors.green}Code generation requested: ${description} (${language})${_colors.reset}`);

	// Check if we have a valid API key
	if (!hasValidApiKey) {
		const demoCode = `// 🤖 Demo Code Generator
// Description: ${description}
// Language: ${language}
//
// This is a demo response. To get real AI-generated code,
// please set your GEMINI_API_KEY environment variable.
// Get one from: https://aistudio.google.com/app/apikey

function demoFunction() {
    console.log("This is demo ${language} code for: ${description}");
    return "Set up your Gemini API key for real code generation!";
}`;
		console.log(`${_colors.red}Demo code response (no API key)${_colors.reset}`);
		return {
			content: [{ type: "text", text: demoCode }],
		};
	}

	try {
		const model_instance = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const prompt = `You are a code generation assistant. Generate clean, well-commented ${language} code based on the user's description. Only return the code, no explanations.

Generate ${language} code for: ${description}`;

		const result = await model_instance.generateContent(prompt);
		const code = result.response.text() || "// Sorry, couldn't generate code";
		console.log(`${_colors.red}Generated code (${code.length} chars)${_colors.reset}`);

		return {
			content: [{ type: "text", text: code }],
		};
	} catch (error) {
		console.error("Code generation error:", error);
		return {
			content: [{ type: "text", text: `// Code generation failed: ${error.message}` }],
		};
	}
}

// Create MCP server instance
function createMcpServer() {
	const mcpServer = new McpServer({
		name: "testAi-mcp-server",
		version: "1.0.0",
	});

	// Note: Manual tool handling removed due to API limitations

	// Register AI chat tool
	mcpServer.registerTool(
		"ai_chat",
		{
			title: "AI Chat",
			description: "Chat with AI using Google Gemini",
		},
		async () => {
			// Use captured arguments from middleware
			const args = currentToolArgs.arguments || {};
			return await _handleAiChat(args);
		},
	);

	// Register code generation tool
	mcpServer.registerTool(
		"generate_code",
		{
			title: "Code Generator",
			description: "Generate code based on description",
		},
		async () => {
			// Use captured arguments from middleware
			const args = currentToolArgs.arguments || {};
			return await _handleCodeGeneration(args);
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
			// Temporarily removing argsSchema to fix validation issue
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

// Add debug middleware and capture tool arguments
app.use((req, _res, next) => {
	console.log(`${_colors.green}${req.method} ${req.path}${_colors.reset}`);
	if (req.method === "POST" && req.body) {
		console.log(`${_colors.green}Request body:${_colors.reset}`, JSON.stringify(req.body, null, 2));

		// Capture tool call arguments
		if (req.body.method === "tools/call" && req.body.params) {
			currentToolArgs = {
				toolName: req.body.params.name,
				arguments: req.body.params.arguments || {},
			};
			console.log(`${_colors.green}Captured tool args:${_colors.reset}`, JSON.stringify(currentToolArgs, null, 2));
		}
	}
	next();
});

// Handle POST requests for client-to-server communication
app.post("/mcp", async (req, res) => {
	console.log(`${_colors.green}POST /mcp received${_colors.reset}`);

	try {
		// Check for existing session ID
		const sessionId = req.headers["mcp-session-id"];
		let transport;

		if (sessionId && transports[sessionId]) {
			// Reuse existing transport
			transport = transports[sessionId];
			console.log(`${_colors.green}Using existing session: ${sessionId}${_colors.reset}`);
		} else {
			// Create new transport for any request (more permissive)
			const newSessionId = randomUUID();
			console.log(`${_colors.green}Creating new session: ${newSessionId}${_colors.reset}`);

			transport = new StreamableHTTPServerTransport({
				sessionIdGenerator: () => newSessionId,
				onsessioninitialized: (sessionId) => {
					console.log(`${_colors.green}Session initialized: ${sessionId}${_colors.reset}`);
					transports[sessionId] = transport;
				},
				enableDnsRebindingProtection: false,
			});

			// Clean up transport when closed
			transport.onclose = () => {
				if (transport.sessionId) {
					console.log(`${_colors.red}Session closed: ${transport.sessionId}${_colors.reset}`);
					delete transports[transport.sessionId];
				}
			};

			const mcpServer = createMcpServer();
			await mcpServer.connect(transport);
		}

		// Handle the request
		await transport.handleRequest(req, res, req.body);
	} catch (error) {
		console.error(`${_colors.red}Error handling MCP request:${_colors.reset}`, error);
		res.status(500).json({
			jsonrpc: "2.0",
			error: {
				code: -32603,
				message: `Internal error: ${error.message}`,
			},
			id: req.body?.id || null,
		});
	}
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
const server = app.listen(PORT, () => {
	console.log(`MCP Server running on port ${PORT}`);
	console.log(`MCP endpoint available at http://localhost:${PORT}/mcp`);
});

// Keep the server alive
server.keepAliveTimeout = 60000;
server.headersTimeout = 65000;

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
