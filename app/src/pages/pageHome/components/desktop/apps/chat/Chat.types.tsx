export type Client = { clientId: string; clientName: string; clientAvatar: number };
export type Message = { messageId: string; time: number; clientId: string; clientName: string; clientAvatar: number; message: string };

export type DataGet =
	| {
			action: "connected";
			clientId: string;
			clientName: string;
			clientAvatar: number;
	  }
	| {
			action: "update";
			clients: Client[];
			messages: Message[];
	  };

export type DataSend =
	| {
			action: "name";
			clientName: string;
			clientAvatar: number;
	  }
	| {
			action: "message";
			message: string;
	  };
