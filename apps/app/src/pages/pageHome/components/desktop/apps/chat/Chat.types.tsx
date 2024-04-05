export type IClient = { clientId: string; clientName: string };
export type IMessage = { messageId: string; time: number; clientId: string; clientName: string; message: string };

export type IDataGet =
	| {
			action: "CONNECTED";
			clientId: string;
			clientName: string;
	  }
	| {
			action: "UPDATE";
			clients: IClient[];
			messages: IMessage[];
	  };

export type IDataSend =
	| {
			action: "NAME";
			clientName: string;
	  }
	| {
			action: "MESSAGE";
			message: string;
	  };
