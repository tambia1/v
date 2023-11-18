import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Props {
	backgroundImage: string;
	setBackgroundImage: (backgroundImage: string) => void;
}

const initialState = {
	backgroundImage: "",
};

export const useThemeStore = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setBackgroundImage: (backgroundImage: string) => set(() => ({ backgroundImage })),
		}),
		{
			version: 1,
			name: "backgroundImage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
