import { create } from "zustand";

interface State {
	token: string;
	setToken: (token: string) => void;
}

export const StoreUser = create<State>()((set) => ({
	token: "",
	role: "guest",
	setToken: (token: string) => set(() => ({ token })),
}));
