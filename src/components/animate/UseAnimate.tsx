import { MutableRefObject, useRef } from "react";
import { IAnimate } from "./Animate";

export const useAnimate = (): MutableRefObject<IAnimate> => {
	const ref = useRef<IAnimate>({
		play: () => {
			return Promise.resolve();
		},
	});

	return ref;
};
