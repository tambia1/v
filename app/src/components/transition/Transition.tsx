import { ReactNode, useState, useRef, useLayoutEffect } from "react";
import * as S from "./Transition.styles";
import { useAnimation } from "@src/hooks/UseAnimation";

interface Props {
	children?: ReactNode;
}

export const Transition = ({ children }: Props) => {
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
	}, [children]);

	return (
		<S.Transition>
			<S.Child ref={refA}>{childA}</S.Child>
			<S.Child ref={refB}>{childB}</S.Child>
		</S.Transition>
	);
};
