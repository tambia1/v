import { useAnimation } from "@src/hooks/UseAnimation";
import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import * as S from "./Transition.styles";

interface Props {
	className?: string;
	children?: ReactNode;
}

export const Transition = ({ className, children }: Props) => {
	const [childA, setChildA] = useState<ReactNode>(children);
	const [childB, setChildB] = useState<ReactNode>(children);

	const refA = useRef(null);
	const refB = useRef(null);
	const animationA = useAnimation(refA);
	const animationB = useAnimation(refB);

	useLayoutEffect(() => {
		const run = async () => {
			setChildA(childB);
			setChildB(children);

			animationA.play("show");
			await animationB.play("hide");

			animationA.play("disappear");
			await animationB.play("appear");
		};

		run();
	}, [children, childB, animationA.play, animationB.play]);

	return (
		<S.Transition className={className}>
			<S.Child ref={refA}>{childA}</S.Child>
			<S.Child ref={refB}>{childB}</S.Child>
		</S.Transition>
	);
};
