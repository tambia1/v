import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
	apiKey: string;
	setApiKey: (apiKey: string) => void;
};

const initialState = {
	apiKey: "",
};

export const useApiKeyStore = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setApiKey: (apiKey: string) => set(() => ({ apiKey })),
		}),
		{
			name: "chatBot",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
