import type { Role } from "@src/pages/pageHome/components/desktop/Desktop.types";
import { create } from "zustand";

interface State {
	token: string;
	role: Role;
	setToken: (token: string) => void;
	setRole: (role: Role) => void;
}

export const StoreUser = create<State>()((set) => ({
	token: "",
	role: "guest",
	setToken: (token: string) => set(() => ({ token })),
	setRole: (role: Role) => set(() => ({ role })),
}));
