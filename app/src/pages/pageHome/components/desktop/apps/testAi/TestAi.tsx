import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useEffect, useState } from "react";
import { useMcpClient } from "./hooks/useMcpClient";
import * as S from "./TestAi.styles";

export const TestAi = () => {
	const [inputValue, setInputValue] = useState("");
	const [textAreaValue, setTextAreaValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [mcpMode, setMcpMode] = useState<"tool" | "resource" | "prompt">("tool");

	// Initialize MCP client
	const mcpClient = useMcpClient("http://localhost:5004/mcp");

	// Connect to MCP server on component mount
	useEffect(() => {
		mcpClient.connect();
	}, [mcpClient.connect]);

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.currentTarget.value);
	};

	const handleSendClick = async () => {
		if (!inputValue.trim()) {
			return;
		}

		if (!mcpClient.isConnected) {
			setTextAreaValue((prev) => `${prev}MCP Client not connected. Trying to connect...\n\n`);
			try {
				await mcpClient.connect();
			} catch (error) {
				setTextAreaValue((prev) => `${prev}Failed to connect to MCP server: ${error}\n\n`);
				return;
			}
		}

		setIsLoading(true);

		try {
			let result = "";

			switch (mcpMode) {
				case "tool":
					// Call the echo tool
					result = await mcpClient.callTool("echo", { message: inputValue });
					break;
				case "resource":
					// Get a greeting resource
					result = await mcpClient.getResource(`greeting://${encodeURIComponent(inputValue)}`);
					break;
				case "prompt": {
					// Get a chat prompt
					const promptResult = await mcpClient.getPrompt("chat", { message: inputValue });
					result = `Prompt created with ${promptResult.messages?.length || 0} messages`;
					break;
				}
				default:
					result = "Unknown MCP mode";
			}

			setTextAreaValue((prev) => `${prev}[${mcpMode.toUpperCase()}] ${result}\n\n`);
			setInputValue("");
		} catch (error) {
			setTextAreaValue((prev) => `${prev}MCP Error: ${error}\n\n`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				<Text variant="body">MCP Mode</Text>
				<S.Row>
					<Button variant={mcpMode === "tool" ? "styled" : "stroke"} onClick={() => setMcpMode("tool")} disabled={isLoading}>
						Tool
					</Button>
					<Button variant={mcpMode === "resource" ? "styled" : "stroke"} onClick={() => setMcpMode("resource")} disabled={isLoading}>
						Resource
					</Button>
					<Button variant={mcpMode === "prompt" ? "styled" : "stroke"} onClick={() => setMcpMode("prompt")} disabled={isLoading}>
						Prompt
					</Button>
				</S.Row>

				<Text variant="body">
					Connection: {mcpClient.isConnected ? "✅ Connected" : mcpClient.isConnecting ? "🔄 Connecting..." : "❌ Disconnected"}
					{mcpClient.error && ` (${mcpClient.error})`}
				</Text>

				<Text variant="body">Message</Text>

				<S.Row>
					<Input value={inputValue} onTextChange={handleInputChange} onPressEnter={handleSendClick} placeholder="Type your message..." disabled={isLoading} />

					<Button variant="styled" onClick={handleSendClick} disabled={isLoading}>
						Send
					</Button>

					<S.LoaderContainer $isVisible={isLoading}>
						<Loader />
					</S.LoaderContainer>
				</S.Row>

				<S.TextArea value={textAreaValue} onChange={handleTextAreaChange} placeholder="MCP responses will appear here..." rows={8} readOnly />
			</S.Col>
		</S.TestAi>
	);
};
