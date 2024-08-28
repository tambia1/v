export type IClient = { clientId: string; clientName: string };
export type IMessage = { messageId: string; time: number; clientId: string; clientName: string; message: string };

export type IDataGet =
	| {
			action: "connected";
			clientId: string;
			clientName: string;
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
	  }
	| {
			action: "message";
			message: string;
	  };
