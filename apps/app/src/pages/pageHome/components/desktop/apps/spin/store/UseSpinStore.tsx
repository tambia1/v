import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	data: string[];
	setData: (data: string[]) => void;
}

const initialState = {
	data: [],
};

export const useSpinStore = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setData: (data: string[]) => set(() => ({ data })),
		}),
		{
			version: 1,
			name: "spin",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
