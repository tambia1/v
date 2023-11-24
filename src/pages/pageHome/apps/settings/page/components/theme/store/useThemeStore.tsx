import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	backgroundImageIndex: number;
	setBackgroundImageIndex: (backgroundImageIndex: number) => void;
}

const initialState = {
	backgroundImageIndex: 0,
};

export const useThemeStore = create<Props>()(
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
