import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	backgroundImageIndex: number;
	setBackgroundImageIndex: (backgroundImageIndex: number) => void;
}

const initialState = {
	backgroundImageIndex: 1,
};

export const ThemeStore = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setBackgroundImageIndex: (backgroundImageIndex: number) => set(() => ({ backgroundImageIndex })),
		}),
		{
			version: 1,
			name: "backgroundImageIndex",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
