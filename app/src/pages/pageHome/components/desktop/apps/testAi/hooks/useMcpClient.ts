import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { useCallback, useEffect, useRef, useState } from "react";

type McpClientState = {
	isConnected: boolean;
	isConnecting: boolean;
	error: string | null;
};

type McpClientActions = {
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
	callTool: (name: string, args: Record<string, any>) => Promise<string>;
	getResource: (uri: string) => Promise<string>;
	getPrompt: (name: string, args: Record<string, any>) => Promise<any>;
	listTools: () => Promise<any[]>;
	listResources: () => Promise<any[]>;
	listPrompts: () => Promise<any[]>;
};

export const useMcpClient = (serverUrl: string): McpClientState & McpClientActions => {
	const [state, setState] = useState<McpClientState>({
		isConnected: false,
		isConnecting: false,
		error: null,
	});

	const clientRef = useRef<Client | null>(null);
	const transportRef = useRef<StreamableHTTPClientTransport | null>(null);

	const connect = useCallback(async () => {
		// Check if already connected or connecting
		if (clientRef.current || transportRef.current) {
			return;
		}

		setState((prev) => ({ ...prev, isConnecting: true, error: null }));

		try {
			// Create client
			const client = new Client({
				name: "testAi-mcp-client",
				version: "1.0.0",
			});

			// Create transport
			const transport = new StreamableHTTPClientTransport(new URL(serverUrl));

			// Connect
			await client.connect(transport);

			clientRef.current = client;
			transportRef.current = transport;

			setState((prev) => ({
				...prev,
				isConnected: true,
				isConnecting: false,
				error: null,
			}));

			console.log("MCP Client connected successfully");
		} catch (error) {
			console.error("Failed to connect MCP client:", error);
			setState((prev) => ({
				...prev,
				isConnected: false,
				isConnecting: false,
				error: error instanceof Error ? error.message : "Connection failed",
			}));
		}
	}, [serverUrl]);

	const disconnect = useCallback(async () => {
		if (clientRef.current) {
			try {
				await clientRef.current.close();
			} catch (error) {
				console.error("Error closing MCP client:", error);
			}
			clientRef.current = null;
		}

		if (transportRef.current) {
			try {
				transportRef.current.close();
			} catch (error) {
				console.error("Error closing MCP transport:", error);
			}
			transportRef.current = null;
		}

		setState({
			isConnected: false,
			isConnecting: false,
			error: null,
		});
	}, []);

	const callTool = useCallback(
		async (name: string, args: Record<string, any>): Promise<string> => {
			if (!clientRef.current || !state.isConnected) {
				throw new Error("MCP client not connected");
			}

			try {
				const result = await clientRef.current.callTool({
					name,
					arguments: args,
				});

				// Extract text content from the result
				if (result.content && Array.isArray(result.content)) {
					const textContent = result.content
						.filter((item) => item.type === "text")
						.map((item) => item.text)
						.join("\n");
					return textContent || "Tool executed successfully";
				}

				return "Tool executed successfully";
			} catch (error) {
				console.error("Error calling tool:", error);
				throw error;
			}
		},
		[state.isConnected],
	);

	const getResource = useCallback(
		async (uri: string): Promise<string> => {
			if (!clientRef.current || !state.isConnected) {
				throw new Error("MCP client not connected");
			}

			try {
				const result = await clientRef.current.readResource({ uri });

				if (result.contents && Array.isArray(result.contents)) {
					return result.contents.map((content) => content.text || content.blob || "").join("\n");
				}

				return "Resource read successfully";
			} catch (error) {
				console.error("Error reading resource:", error);
				throw error;
			}
		},
		[state.isConnected],
	);

	const getPrompt = useCallback(
		async (name: string, args: Record<string, any>): Promise<any> => {
			if (!clientRef.current || !state.isConnected) {
				throw new Error("MCP client not connected");
			}

			try {
				const result = await clientRef.current.getPrompt({
					name,
					arguments: args,
				});

				return result;
			} catch (error) {
				console.error("Error getting prompt:", error);
				throw error;
			}
		},
		[state.isConnected],
	);

	const listTools = useCallback(async (): Promise<any[]> => {
		if (!clientRef.current || !state.isConnected) {
			throw new Error("MCP client not connected");
		}

		try {
			const result = await clientRef.current.listTools();
			return result.tools || [];
		} catch (error) {
			console.error("Error listing tools:", error);
			throw error;
		}
	}, [state.isConnected]);

	const listResources = useCallback(async (): Promise<any[]> => {
		if (!clientRef.current || !state.isConnected) {
			throw new Error("MCP client not connected");
		}

		try {
			const result = await clientRef.current.listResources();
			return result.resources || [];
		} catch (error) {
			console.error("Error listing resources:", error);
			throw error;
		}
	}, [state.isConnected]);

	const listPrompts = useCallback(async (): Promise<any[]> => {
		if (!clientRef.current || !state.isConnected) {
			throw new Error("MCP client not connected");
		}

		try {
			const result = await clientRef.current.listPrompts();
			return result.prompts || [];
		} catch (error) {
			console.error("Error listing prompts:", error);
			throw error;
		}
	}, [state.isConnected]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			disconnect();
		};
	}, [disconnect]);

	return {
		...state,
		connect,
		disconnect,
		callTool,
		getResource,
		getPrompt,
		listTools,
		listResources,
		listPrompts,
	};
};
