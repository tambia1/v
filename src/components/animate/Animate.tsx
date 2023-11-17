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
	const [animation, setAnimation] = useState<S.IAnimation>("none");
	const refResolve = useRef<() => void>(() => {});

	const play = (animation: S.IAnimation): Promise<void> => {
		setAnimation(animation);

		return new Promise<void>((resolve) => {
			refResolve.current = resolve;
		});
	};

	const onAnimationStart = () => {
		console.log("start", 0);
	};

	const onAnimationEnd = () => {
		console.log("end", 0);
		refResolve.current();
	};

	useImperativeHandle(useAnimate, () => ({ play }));

	return (
		<S.Animate $animation={animation} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Animate>
	);
};
