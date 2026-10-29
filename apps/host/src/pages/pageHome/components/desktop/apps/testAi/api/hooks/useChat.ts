import { ApiError, GoogleGenAI } from "@google/genai";
import { useMutation } from "@tanstack/react-query";

import type { ChatRequest, QueryResult } from "../Api.types";

type Props = ChatRequest;
type Result = QueryResult<string>;

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
			} else {
				result = { error: 2, message: error.message };
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
