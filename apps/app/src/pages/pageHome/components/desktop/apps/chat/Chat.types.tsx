export type IClient = { clientId: string; clientName: string };
export type IContent = { messageId: string; time: number; clientId: string; clientName: string; message: string };

export type IMessage =
	| {
			action: "CONNECTED";
			clientId: string;
			clientName: string;
	  }
	| {
			action: "CONNECTION";
			clientId: string;
			clientName: string;
			clients: IClient[];
	  }
	| {
			action: "NAME";
			clientName: string;
	  }
	| {
			action: "NAMES";
			clients: IClient[];
	  }
	| {
			action: "MESSAGE";
			clientId: string;
			clientName: string;
			time: number;
			contentId: string;
			content: string;
			status: "SENT" | "DELIVERED" | "READ";
	  }
	| {
			action: "MESSAGES";
			messages: IContent[];
	  };
