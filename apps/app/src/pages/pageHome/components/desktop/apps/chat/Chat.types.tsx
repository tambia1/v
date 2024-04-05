export type IClient = { clientId: string; clientName: string };

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
			action: "CLIENTS";
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
	  };
