import { create } from "zustand";
import { Button } from "@src/components/button/Button";
import * as S from "./Debug.styles";

interface LoggerStore {
	log: string[];
	addLog: (text: string) => void;
	clearLog: () => void;
}

export const useLoggerStore = create<LoggerStore>((set) => ({
	log: ["Console"],
	addLog: (text: string) => set((state) => ({ log: [...state.log, text] })),
	clearLog: () => set({ log: ["Console"] }),
}));

export const logger = (text: string) => {
	useLoggerStore.getState().addLog(text);
};

export const Debug = () => {
	const { log, clearLog } = useLoggerStore();

	return (
		<S.Debug>
			<Button onClick={clearLog}>Clear</Button>

			<S.Console>{log.map((value, index) => `${index}: ${value}\n`)}</S.Console>
		</S.Debug>
	);
};
