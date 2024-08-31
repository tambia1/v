export type IClient = { clientId: string; clientName: string; clientAvatar: number };
export type IMessage = { messageId: string; time: number; clientId: string; clientName: string; clientAvatar: number; message: string };

export type IDataGet =
	| {
			action: "connected";
			clientId: string;
			clientName: string;
			clientAvatar: number;
	  }
	| {
			action: "update";
			clients: IClient[];
			messages: IMessage[];
	  };

export type IDataSend =
	| {
			action: "name";
			clientName: string;
			clientAvatar: number;
	  }
	| {
			action: "message";
			message: string;
	  };
