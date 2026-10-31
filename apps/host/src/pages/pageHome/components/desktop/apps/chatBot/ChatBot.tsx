import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Select } from "@src/components/select/Select";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useApiKeyStore } from "./api/hooks/useApiKeyStore";
import { type ChatMessage, useMutateChat } from "./api/hooks/useChat";
import * as S from "./ChatBot.styles";
import { Avatar, type AvatarHandle } from "./components/avatar/Avatar";
import { characters } from "./components/avatar/characters";
import { useSpeech } from "./hooks/useSpeech";

const formatTime = (timestamp: number) => {
	return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const ChatBot = () => {
	const { t } = useTranslation();
	const { apiKey, setApiKey } = useApiKeyStore();
	const [apiKeyValue, setApiKeyValue] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [streamingText, setStreamingText] = useState("");
	const conversationEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { mutate: sendMessage, isPending } = useMutateChat();
	const { isSupported: isSpeechSupported, isListening, listen, stopListening, speak, stopSpeaking } = useSpeech();
	const avatarRef = useRef<AvatarHandle>(null);
	const [characterId, setCharacterId] = useState(characters[0].id);
	const character = characters.find((c) => c.id === characterId) ?? characters[0];

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
		stopSpeaking();
	};

	const send = (text: string, isVoice: boolean) => {
		const content = text.trim();

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

					if (isVoice && !aiMessage.isError) {
						speak(aiMessage.content, {
							onSentence: (sentence, durationMs) => avatarRef.current?.speak(sentence, durationMs),
							onEnd: () => avatarRef.current?.stop(),
						});
					}
				},
			},
		);
	};

	const handleSendClick = () => {
		send(inputValue, false);
	};

	const handleTalkClick = () => {
		if (isListening) {
			stopListening();
			return;
		}

		listen((transcript) => send(transcript, true));
	};

	const handleClearClick = () => {
		setMessages([]);
		stopSpeaking();
		avatarRef.current?.stop();
	};

	return (
		<S.ChatBot>
			<Text variant="title">
				<T>{lang.chatBot.title}</T>
			</Text>

			<S.Col>
				{!apiKey ? (
					<S.Row>
						<Input
							type="password"
							value={apiKeyValue}
							onTextChange={setApiKeyValue}
							onPressEnter={handleConnectClick}
							placeholder={t(lang.chatBot.apiKeyPlaceholder)}
						/>

						<Button variant="styled" onClick={handleConnectClick} disabled={!apiKeyValue.trim()}>
							<T>{lang.chatBot.connect}</T>
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
								placeholder={t(lang.chatBot.placeholder)}
								disabled={isPending}
							/>

							<Button variant="styled" onClick={handleSendClick} disabled={isPending || !inputValue.trim()}>
								<T>{lang.chatBot.send}</T>
							</Button>

							{isSpeechSupported && (
								<Button variant="styled" onClick={handleTalkClick} disabled={isPending}>
									<T>{isListening ? lang.chatBot.stopTalk : lang.chatBot.talk}</T>
								</Button>
							)}

							<S.LoaderContainer $isVisible={isPending}>
								<Loader />
							</S.LoaderContainer>
						</S.Row>

						<S.ControlsRow>
							<Button variant="styled" onClick={handleClearClick} disabled={isPending}>
								<T>{lang.chatBot.clear}</T>
							</Button>

							<Button variant="styled" onClick={handleDisconnectClick} disabled={isPending}>
								<T>{lang.chatBot.disconnect}</T>
							</Button>
						</S.ControlsRow>
					</>
				)}

				<S.CharacterSelect>
					<Select onClickItem={(_index, value) => setCharacterId(value)} size="size800">
						<Select.Display>{character.name}</Select.Display>
						<Select.Items>
							{characters.map((c) => (
								<Select.Items.Item key={c.id} value={c.id}>
									{c.name}
								</Select.Items.Item>
							))}
						</Select.Items>
					</Select>
				</S.CharacterSelect>

				<S.ChatBotAvatar>
					<Avatar ref={avatarRef} character={character} isListening={isListening} />
				</S.ChatBotAvatar>

				<S.ConversationContainer>
					{messages.length === 0 && !isPending ? (
						<S.EmptyState>
							<Text variant="body">
								<T>{apiKey ? lang.chatBot.emptyTitle : lang.chatBot.connectTitle}</T>
							</Text>
							<Text variant="note">
								<T>{apiKey ? lang.chatBot.emptyNote : lang.chatBot.connectNote}</T>
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
		</S.ChatBot>
	);
};
