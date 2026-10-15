import type { ReactNode } from "react";

export type MessageState = "idle" | "loading" | "success" | "error";

export type Message = {
	state: MessageState;
	message: ReactNode;
};
