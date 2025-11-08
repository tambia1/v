export type Client = {
	clientId: string;
	clientName: string;
	clientAvatar: number;
};

export type Message = {
	clientId: string;
	clientName: string;
	clientAvatar: number;
	time: number;
	messageId: string;
	message: string;
};
