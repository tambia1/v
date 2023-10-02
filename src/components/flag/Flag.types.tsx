import greatBritain from "./assets/great-britain.png";
import finland from "./assets/finland.png";

export const Flags = {
	"": "",

	greatBritain,
	finland,
} as const;

export type FlagName = keyof typeof Flags;
