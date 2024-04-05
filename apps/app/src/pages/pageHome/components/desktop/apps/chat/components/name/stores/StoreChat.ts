import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	name: string;
	setData: (name: string) => void;
}

const initialState = {
	name: "",
};

export const StoreChat = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setData: (name: string) => set(() => ({ name })),
		}),
		{
			version: 1,
			name: "chat",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
