import { ApiError, GoogleGenAI } from "@google/genai";
import { useMutation } from "@tanstack/react-query";

export type ChatMessage = {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	isError?: boolean;
};

type Props = {
	apiKey: string;
	messages: ChatMessage[];
	onText: (text: string) => void;
};

type Result = {
	error: number;
	message: string;
	response?: string;
};

const getErrorMessage = (message: string): string => {
	try {
		const parsed = JSON.parse(message);
		const inner = parsed?.error?.message;

		return typeof inner === "string" ? getErrorMessage(inner) : message;
	} catch {
		return message;
	}
};

const send = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const client = new GoogleGenAI({ apiKey: props.apiKey });

		const stream = await client.models.generateContentStream({
			model: "gemini-flash-latest",
			contents: props.messages
				.filter((message) => !message.isError)
				.map((message) => ({
					role: message.role === "user" ? "user" : "model",
					parts: [{ text: message.content }],
				})),
		});

		let text = "";
		let blockReason: string | undefined;

		for await (const chunk of stream) {
			const chunkText = chunk.text ?? "";
			text += chunkText;
			blockReason = chunk.promptFeedback?.blockReason ?? blockReason;
			props.onText(chunkText);
		}

		if (!text && blockReason) {
			result = {
				error: 3,
				message: `Gemini declined to answer (${blockReason})`,
			};
		} else {
			result = {
				error: 0,
				message: "",
				response: text,
			};
		}
	} catch (error) {
		if (error instanceof ApiError) {
			if (error.status === 429) {
				result = { error: 2, message: "Rate limited, try again later" };
			} else if (error.status === 400 || error.status === 401 || error.status === 403) {
				result = { error: 2, message: "Invalid API key or request" };
			} else if (error.status === 503) {
				result = { error: 2, message: "Gemini is busy right now, please try again in a moment" };
			} else if (error.status >= 500) {
				result = { error: 2, message: "Gemini had a problem, please try again later" };
			} else {
				result = { error: 2, message: getErrorMessage(error.message) };
			}
		} else {
			result = { error: 1, message: "Network error" };
		}
	}

	return result;
};

export const useMutateChat = () => {
	return useMutation({
		mutationFn: send,
	});
};
