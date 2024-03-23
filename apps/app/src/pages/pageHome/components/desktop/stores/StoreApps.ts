import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IApp {
	name: string;
	url: string;
	icon: string;
}

interface Props {
	apps: IApp[];
	setData: (apps: IApp[]) => void;
}

const initialState = {
	apps: [],
};

export const StoreApps = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setData: (apps: IApp[]) => set(() => ({ apps })),
		}),
		{
			version: 1,
			name: "apps",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
