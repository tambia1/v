import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Api } from "./api/Api";
import type { ChatMessage } from "./api/Api.types";
import { useApiKeyStore } from "./api/hooks/useApiKeyStore";
import * as S from "./TestAi.styles";

const formatTime = (timestamp: number) => {
	return new Date(timestamp).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const TestAi = () => {
	const { t } = useTranslation();
	const { apiKey, setApiKey } = useApiKeyStore();
	const [apiKeyValue, setApiKeyValue] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [streamingText, setStreamingText] = useState("");
	const conversationEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { mutate: sendMessage, isPending } = Api.chat.useMutateChat();

	useEffect(() => {
		conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, streamingText]);

	useEffect(() => {
		if (isPending || !apiKey) {
			return;
		}

		const timeout = setTimeout(() => {
			inputRef.current?.focus();
		}, 100);

		return () => clearTimeout(timeout);
	}, [isPending, apiKey]);

	const handleConnectClick = () => {
		const value = apiKeyValue.trim();

		if (!value) {
			return;
		}

		setApiKey(value);
		setApiKeyValue("");
	};

	const handleDisconnectClick = () => {
		setApiKey("");
		setMessages([]);
	};

	const handleSendClick = () => {
		const content = inputValue.trim();

		if (!content || isPending) {
			return;
		}

		const userMessage: ChatMessage = {
			role: "user",
			content,
			timestamp: Date.now(),
		};

		const history = [...messages, userMessage];

		setMessages(history);
		setInputValue("");
		setStreamingText("");

		sendMessage(
			{
				apiKey,
				messages: history,
				onText: (text) => setStreamingText((prev) => prev + text),
			},
			{
				onSuccess: (result) => {
					const aiMessage: ChatMessage =
						result.error === 0
							? { role: "assistant", content: result.response ?? "", timestamp: Date.now() }
							: { role: "assistant", content: `Error: ${result.message}`, timestamp: Date.now(), isError: true };

					setMessages((prev) => [...prev, aiMessage]);
					setStreamingText("");
				},
			},
		);
	};

	const handleClearClick = () => {
		setMessages([]);
	};

	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				{!apiKey ? (
					<S.Row>
						<Input
							type="password"
							value={apiKeyValue}
							onTextChange={setApiKeyValue}
							onPressEnter={handleConnectClick}
							placeholder={t(lang.testAi.apiKeyPlaceholder)}
						/>

						<Button variant="styled" onClick={handleConnectClick} disabled={!apiKeyValue.trim()}>
							<T>{lang.testAi.connect}</T>
						</Button>
					</S.Row>
				) : (
					<>
						<S.Row>
							<Input
								ref={inputRef}
								value={inputValue}
								onTextChange={setInputValue}
								onPressEnter={handleSendClick}
								placeholder={t(lang.testAi.placeholder)}
								disabled={isPending}
							/>

							<Button variant="styled" onClick={handleSendClick} disabled={isPending || !inputValue.trim()}>
								<T>{lang.testAi.send}</T>
							</Button>

							<S.LoaderContainer $isVisible={isPending}>
								<Loader />
							</S.LoaderContainer>
						</S.Row>

						<S.ControlsRow>
							<Button variant="styled" onClick={handleClearClick} disabled={isPending}>
								<T>{lang.testAi.clear}</T>
							</Button>

							<Button variant="styled" onClick={handleDisconnectClick} disabled={isPending}>
								<T>{lang.testAi.disconnect}</T>
							</Button>
						</S.ControlsRow>
					</>
				)}

				<S.ConversationContainer>
					{messages.length === 0 && !isPending ? (
						<S.EmptyState>
							<Text variant="body">
								<T>{apiKey ? lang.testAi.emptyTitle : lang.testAi.connectTitle}</T>
							</Text>
							<Text variant="note">
								<T>{apiKey ? lang.testAi.emptyNote : lang.testAi.connectNote}</T>
							</Text>
						</S.EmptyState>
					) : (
						messages.map((message) => (
							<S.MessageBubble key={message.timestamp} $isUser={message.role === "user"}>
								{message.content}
								<S.MessageTime>{formatTime(message.timestamp)}</S.MessageTime>
							</S.MessageBubble>
						))
					)}
					{isPending && <S.MessageBubble $isUser={false}>{streamingText || <Loader />}</S.MessageBubble>}
					<div ref={conversationEndRef} />
				</S.ConversationContainer>
			</S.Col>
		</S.TestAi>
	);
};
