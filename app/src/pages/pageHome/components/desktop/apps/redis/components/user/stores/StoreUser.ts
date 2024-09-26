import { create } from "zustand";

interface State {
	csrf: string;
	setCsrf: (csrf: string) => void;
}

export const StoreUser = create<State>()((set) => ({
	csrf: "",
	setCsrf: (csrf: string) => set(() => ({ csrf })),
}));
