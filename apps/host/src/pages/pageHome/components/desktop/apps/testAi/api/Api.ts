import { useMutateChat } from "./chat/MutateChat";
import { useMutateClearConversation } from "./chat/MutateClearConversation";

export const Api = {
	chat: {
		useMutateChat,
		useMutateClearConversation,
	},
};
