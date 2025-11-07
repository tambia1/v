import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { INote } from "../Notes.types";

interface Props {
	data: { [K in string]: INote };
	setNote: (id: string, title: string, text: string) => void;
	setNotes: (data: { [K in string]: INote }) => void;
}

const initialState = {
	data: {},
};

export const useNotesStore = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setNote: (id: string, title: string, text: string) =>
				set((state) => ({
					data: { ...state.data, [id]: { id, title, text } },
				})),
			setNotes: (data: { [K in string]: INote }) => set(() => ({ data })),
		}),
		{
			version: 1,
			name: "notes",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
