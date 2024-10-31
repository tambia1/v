import type { ReactNode } from "react";

export type IMessageState = "idle" | "loading" | "success" | "error";

export type IMessage = {
	state: IMessageState;
	message: ReactNode;
};
