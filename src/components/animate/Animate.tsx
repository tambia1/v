import React, { MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import * as S from "./Animate.styles";

interface Props {
	useAnimate: MutableRefObject<IAnimate>;
	children?: React.ReactNode;
}

export interface IAnimate {
	play: (animationType: S.IAnimation) => Promise<void>;
}

export const Animate = ({ useAnimate, children }: Props) => {
	const refContainer = useRef<HTMLDivElement | null>(null);
	const [animation, setAnimation] = useState<S.IAnimation>("none");
	const [key, setKey] = useState<number>(0);
	const refResolve = useRef<() => void>(() => {});

	const play = (animation: S.IAnimation): Promise<void> => {
		setKey((prevKey) => prevKey + 1);
		setAnimation(animation);

		return new Promise<void>((resolve) => {
			refResolve.current = resolve;
		});
	};

	const onAnimationStart = () => {
		console.log("start", key);
	};

	const onAnimationEnd = () => {
		console.log("end", key);
		refResolve.current();
	};

	useImperativeHandle(useAnimate, () => ({ play }));

	return (
		<S.Animate ref={refContainer} key={key} $animation={animation} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Animate>
	);
};
