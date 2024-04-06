import { create } from "zustand";
import { IClient, IMessage } from "../../../Chat.types";

interface State {
	client: IClient;
	messages: IMessage[];
	setClient: (client: IClient) => void;
	setMessages: (messages: IMessage[]) => void;
}

export const useStoreTalk = create<State>()((set) => ({
	client: { clientId: "", clientName: "" },
	messages: [],
	setClient: (client: IClient) => set(() => ({ client })),
	setMessages: (messages: IMessage[]) => set(() => ({ messages })),
}));
