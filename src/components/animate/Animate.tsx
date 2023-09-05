import React, { MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import * as S from "./Animate.styles";

interface Props {
	useAnimate: MutableRefObject<IAnimate>;
	children?: React.ReactNode;
}

export interface IAnimate {
	play: (animationType: S.IAnimationType) => Promise<void>;
}

export const Animate = ({ useAnimate, children }: Props) => {
	const refContainer = useRef<HTMLDivElement | null>(null);
	const [animationType, setAnimationType] = useState<S.IAnimationType>("none");
	const [key, setKey] = useState<number>(0);
	const refResolve = useRef<() => void>(() => {});

	const play = (animationType: S.IAnimationType): Promise<void> => {
		setKey((prevKey) => prevKey + 1);
		setAnimationType(animationType);

		return new Promise<void>((resolve) => {
			refResolve.current = resolve;
		});
	};

	const onAnimationEnd = () => {
		refResolve.current();
	};

	useImperativeHandle(useAnimate, () => ({ play }));

	return (
		<S.Container ref={refContainer} key={key} $animationType={animationType} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Container>
	);
};
