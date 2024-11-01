import type { IRole } from "@src/pages/pageHome/components/desktop/Desktop.types";
import { create } from "zustand";

interface State {
	token: string;
	role: IRole;
	setToken: (token: string) => void;
	setRole: (role: IRole) => void;
}

export const StoreUser = create<State>()((set) => ({
	token: "",
	role: "guest",
	setToken: (token: string) => set(() => ({ token })),
	setRole: (role: IRole) => set(() => ({ role })),
}));
