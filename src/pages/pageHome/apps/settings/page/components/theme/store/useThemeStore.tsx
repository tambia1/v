import { create } from "zustand";

interface Props {
	backgroundImage: string;
	setBackgroundImage: (backgroundImage: string) => void;
}

const initialState = {
	backgroundImage: "/os/src/pages/pageHome/apps/settings/page/components/theme/background/imagesTheme1/bg_0.png",
};

export const useThemeStore = create<Props>()((set) => ({
	...initialState,
	setBackgroundImage: (backgroundImage: string) => set(() => ({ backgroundImage })),
}));
