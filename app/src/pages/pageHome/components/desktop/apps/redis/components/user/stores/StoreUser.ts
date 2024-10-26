import { create } from "zustand";
import type { Login, QueryResult } from "../../../queries/Query.types";

interface State {
	csrf: string;
	loginResponse: QueryResult<Login>;
	setCsrf: (csrf: string) => void;
	setLoginResponse: (loginResponse: QueryResult<Login>) => void;
}

export const StoreUser = create<State>()((set) => ({
	csrf: "",
	loginResponse: { error: -1, message: "" },
	setCsrf: (csrf: string) => set(() => ({ csrf })),
	setLoginResponse: (loginResponse: QueryResult<Login>) => set(() => ({ loginResponse })),
}));
