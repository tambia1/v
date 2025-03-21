import { create } from "zustand";
import { Client, Message } from "../../../Chat.types";

interface State {
	client: Client;
	messages: Message[];
	setClient: (client: Client) => void;
	setMessages: (messages: Message[]) => void;
}

export const useStoreTalk = create<State>()((set) => ({
	client: { clientId: "", clientName: "", clientAvatar: 0 },
	messages: [],
	setClient: (client: Client) => set(() => ({ client })),
	setMessages: (messages: Message[]) => set(() => ({ messages })),
}));
