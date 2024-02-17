import { RefObject, useEffect, useRef } from "react";

const Animations = {
	none: "",
	show: `
	  animation: show linear 0s both;
	  pointer-events: all;
	`,
	hide: `
	  animation: hide linear 0s both;
	  pointer-events: none;
	`,
	appear: `
	  animation: appear ease 0.3s both;
	  pointer-events: all;
	`,
	disappear: `
	  animation: disappear ease 0.3s both;
	  pointer-events: none;
	`,
} as const;

export type IAnimation = keyof typeof Animations;

type IResolve = (value: void | PromiseLike<void>) => void;

export const useAnimation = (ref: RefObject<HTMLElement>) => {
	const refResolve = useRef<IResolve>();

	useEffect(() => {
		const div = ref.current;

		if (!div) {
			return;
		}

		const onAnimationStart = (e: AnimationEvent) => {
			e.stopPropagation();
		};

		const onAnimationEnd = (e: AnimationEvent) => {
			e.stopPropagation();
			refResolve.current?.();
			refResolve.current = undefined;
		};

		div.addEventListener("animationstart", onAnimationStart);
		div.addEventListener("animationend", onAnimationEnd);

		return () => {
			div.removeEventListener("animationstart", onAnimationStart);
			div.removeEventListener("animationend", onAnimationEnd);
		};
	}, [ref.current]);

	const play = (animation: IAnimation) => {
		const div = ref.current;

		if (!div) {
			return;
		}

		div.style.cssText = Animations[animation];

		return new Promise<void>((resolve: IResolve) => {
			refResolve.current = resolve;
		});
	};

	return { play };
};
