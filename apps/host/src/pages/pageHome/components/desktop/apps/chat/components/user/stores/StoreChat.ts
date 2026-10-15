import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
	name: string;
	avatar: number;
	setName: (name: string) => void;
	setAvatar: (avatar: number) => void;
};

const initialState = {
	name: "",
	avatar: 0,
};

export const StoreChat = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setName: (name: string) => set(() => ({ name })),
			setAvatar: (avatar: number) => set(() => ({ avatar })),
		}),
		{
			version: 1.1,
			name: "chat",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
