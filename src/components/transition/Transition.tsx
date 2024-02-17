import { useEffect, ReactNode, useState } from "react";
import * as S from "./Transition.styles";
import { Animate } from "../animate/Animate";
import { useAnimate } from "../animate/UseAnimate";

interface Props {
	children?: ReactNode;
}

export const Transition = ({ children }: Props) => {
	const [childA, setChildA] = useState<ReactNode>(children);
	const [childB, setChildB] = useState<ReactNode>(children);
	const animateA = useAnimate("hide");
	const animateB = useAnimate("show");

	useEffect(() => {
		const run = async () => {
			setChildA(childB);
			setChildB(children);

			animateA.current.play("show");
			await animateB.current.play("hide");

			animateA.current.play("disappear");
			await animateB.current.play("appear");
		};

		run();
	}, [children]);

	return (
		<S.Transition>
			<Animate useAnimate={animateA}>
				<S.Child>{childA}</S.Child>
			</Animate>

			<Animate useAnimate={animateB}>
				<S.Child>{childB}</S.Child>
			</Animate>
		</S.Transition>
	);
};
