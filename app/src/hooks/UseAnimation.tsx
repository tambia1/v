import { type RefObject, useCallback, useLayoutEffect, useRef } from "react";
import "./UseAnimation.css";

const Animations = {
	none: "",
	show: `
	  animation: useAnimationShow linear 0s both;
	  pointer-events: all;
	`,
	hide: `
	  animation: useAnimationHide linear 0s both;
	  pointer-events: none;
	`,
	appear: `
	  animation: useAnimationAppear ease 0.3s both;
	  pointer-events: all;
	`,
	disappear: `
	  animation: useAnimationDisappear ease 0.3s both;
	  pointer-events: none;
	`,
} as const;

export type Animation = keyof typeof Animations;

type Resolve = (value: void | PromiseLike<void>) => void;

export const useAnimation = (ref: RefObject<HTMLElement | null>) => {
	const refResolve = useRef<Resolve>(null);

	useLayoutEffect(() => {
		const div = ref?.current;

		if (!div) {
			return;
		}

		const onAnimationStart = (_e: AnimationEvent) => {
			// e.stopPropagation();
		};

		const onAnimationEnd = (_e: AnimationEvent) => {
			// e.stopPropagation();

			refResolve.current?.();
			refResolve.current = null;
		};

		div.addEventListener("animationstart", onAnimationStart);
		div.addEventListener("animationend", onAnimationEnd);

		return () => {
			div.removeEventListener("animationstart", onAnimationStart);
			div.removeEventListener("animationend", onAnimationEnd);
		};
	}, [ref?.current]);

	const play = useCallback(
		(animation: Animation) => {
			const div = ref?.current;

			if (!div) {
				return;
			}

			div.style.cssText = Animations[animation];

			return new Promise<void>((resolve: Resolve) => {
				refResolve.current = resolve;
			});
		},
		[ref],
	);

	return { play };
};
