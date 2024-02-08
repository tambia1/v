import { MutableRefObject, useEffect, useRef } from "react";
import { IAnimate } from "./Animate";
import { IAnimation } from "./Animate.styles";

export const useAnimate = (initialAnimation: IAnimation): MutableRefObject<IAnimate> => {
	const ref = useRef<IAnimate>({
		play: () => {
			return Promise.resolve();
		},
	});

	useEffect(() => {
		ref.current.play(initialAnimation);
	}, [initialAnimation]);

	return ref;
};
