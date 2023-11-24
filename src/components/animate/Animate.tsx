import React, { MutableRefObject, useImperativeHandle, useState } from "react";
import * as S from "./Animate.styles";

interface Props {
	useAnimate: MutableRefObject<IAnimate>;
	children?: React.ReactNode;
}

export interface IAnimate {
	play: (animationType: S.IAnimation) => Promise<void>;
}

type IResolve = (value: void | PromiseLike<void>) => void;

export const Animate = ({ useAnimate, children, ...rest }: Props) => {
	const [animation, setAnimation] = useState<S.IAnimation>("none");
	const [resolve, setResolve] = useState<IResolve>();

	const play = (animation: S.IAnimation): Promise<void> => {
		setAnimation(animation);

		return new Promise<void>((res: IResolve) => {
			setResolve(() => res);
		});
	};

	const onAnimationStart = (e: React.AnimationEvent) => {
		e.stopPropagation();
	};

	const onAnimationEnd = (e: React.AnimationEvent) => {
		e.stopPropagation();
		resolve?.();
		setResolve(() => undefined);
	};

	useImperativeHandle(useAnimate, () => ({ play }));

	return (
		<S.Animate $animation={animation} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd} {...rest}>
			{children}
		</S.Animate>
	);
};
