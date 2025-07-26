import config from "@src/config.json";
import { useMutation } from "@tanstack/react-query";
import type { ClearConversationRequest, ClearConversationResponse, QueryResult } from "../Api.types";

type Props = ClearConversationRequest;
type Result = QueryResult<ClearConversationResponse>;

const send = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch(`http://localhost:${config.serverAi.port}/clear`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				conversationId: props.conversationId || "default",
			}),
		});

		const res = await response.json();

		if (response.ok) {
			result = {
				error: 0,
				message: "",
				response: res,
			};
		} else {
			result = {
				error: 2,
				message: res.error || "Failed to clear conversation",
			};
		}
	} catch (_error) {
		result = {
			error: 1,
			message: "Network error",
		};
	}

	return result;
};

export const useMutateClearConversation = () => {
	return useMutation({
		mutationFn: send,
	});
};
