export type QueryResult<T> = {
	error: number;
	message: string;
	response?: T;
};

export type ChatMessage = {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	isError?: boolean;
};

export type ChatRequest = {
	apiKey: string;
	messages: ChatMessage[];
	onText: (text: string) => void;
};
