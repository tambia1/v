export type QueryResult<T> = {
	error: number;
	message: string;
	response?: T;
};

export type ChatMessage = {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
};

export type ChatRequest = {
	message: string;
	conversationId?: string;
};

export type ChatResponse = {
	response: string;
	conversationId: string;
	timestamp: number;
};

export type ClearConversationRequest = {
	conversationId?: string;
};

export type ClearConversationResponse = {
	message: string;
	conversationId: string;
};

export type HealthResponse = {
	status: string;
	model: string;
};
