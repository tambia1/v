import { create } from "zustand";

interface State {
	token: string;
	setToken: (token: string) => void;
}

export const useStoreLogin = create<State>()((set) => ({
	token: "",
	setToken: (token: string) => set(() => ({ token })),
}));
