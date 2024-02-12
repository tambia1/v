import { IRole } from "@src/pages/pageHome/components/desktop/Desktop.types";
import { create } from "zustand";

interface State {
	token: string;
	role: IRole;
	setData: (token: string, role: IRole) => void;
}

export const useStoreLogin = create<State>()((set) => ({
	token: "",
	role: "guest",
	setData: (token: string, role: IRole) => set(() => ({ token, role })),
}));
