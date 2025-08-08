import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useEffect, useRef, useState } from "react";
import { Api } from "./api/Api";
import type { ChatMessage } from "./api/Api.types";
import * as S from "./TestAi.styles";

export const TestAi = () => {
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const conversationEndRef = useRef<HTMLDivElement>(null);
	const _inputRef = useRef<HTMLInputElement>(null);
	const conversationId = "default";

	const { mutate: sendMessage } = Api.chat.useMutateChat();
	const { mutate: clearConversation } = Api.chat.useMutateClearConversation();

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (messages.length > 0) {
			conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	// Focus input when loading ends
	useEffect(() => {
		if (!isLoading) {
			// Small delay to ensure the input is fully enabled
			setTimeout(() => {
				_inputRef.current?.focus();
			}, 100);
		}
	}, [isLoading]);

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleSendClick = async () => {
		if (!inputValue.trim() || isLoading) {
			return;
		}

		const userMessage: ChatMessage = {
			role: "user",
			content: inputValue.trim(),
			timestamp: Date.now(),
		};

		// Add user message immediately
		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		// Send message to AI
		sendMessage(
			{
				message: userMessage.content,
				conversationId,
			},
			{
				onSuccess: (result) => {
					if (result.error === 0 && result.response) {
						const aiMessage: ChatMessage = {
							role: "assistant",
							content: result.response.response,
							timestamp: result.response.timestamp,
						};
						setMessages((prev) => [...prev, aiMessage]);
					} else {
						const errorMessage: ChatMessage = {
							role: "assistant",
							content: `Error: ${result.message || "Failed to get response"}`,
							timestamp: Date.now(),
						};
						setMessages((prev) => [...prev, errorMessage]);
					}
					setIsLoading(false);
				},
				onError: (error) => {
					const errorMessage: ChatMessage = {
						role: "assistant",
						content: `Network error: ${error.message}`,
						timestamp: Date.now(),
					};
					setMessages((prev) => [...prev, errorMessage]);
					setIsLoading(false);
				},
			},
		);
	};

	const handleClearConversation = () => {
		clearConversation(
			{ conversationId },
			{
				onSuccess: () => {
					setMessages([]);
				},
			},
		);
	};

	const formatTime = (timestamp: number) => {
		return new Date(timestamp).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				<S.Row>
					<Input value={inputValue} onTextChange={handleInputChange} onPressEnter={handleSendClick} placeholder="Ask the AI anything..." disabled={isLoading} />

					<Button variant="styled" onClick={handleSendClick} disabled={isLoading || !inputValue.trim()}>
						Send
					</Button>

					<S.LoaderContainer $isVisible={isLoading}>
						<Loader />
					</S.LoaderContainer>
				</S.Row>

				<S.ControlsRow>
					<Button variant="styled" onClick={handleClearConversation} disabled={isLoading}>
						Clear
					</Button>
				</S.ControlsRow>

				<S.ConversationContainer>
					{messages.length === 0 ? (
						<S.EmptyState>
							<Text variant="body">Start a conversation with AI</Text>
							<Text variant="note">Ask me anything!</Text>
						</S.EmptyState>
					) : (
						messages.map((message, index) => (
							<S.MessageBubble key={index} $isUser={message.role === "user"}>
								{message.content}
								<S.MessageTime>{formatTime(message.timestamp)}</S.MessageTime>
							</S.MessageBubble>
						))
					)}
					{isLoading && (
						<S.MessageBubble $isUser={false}>
							<Loader />
						</S.MessageBubble>
					)}
					<div ref={conversationEndRef} />
				</S.ConversationContainer>
			</S.Col>
		</S.TestAi>
	);
};
