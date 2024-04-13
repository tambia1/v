import { Text } from "@src/components/text/Text";
import * as S from "./TestAnimation.styles";
import { useEffect, useRef } from "react";
import { Animation, ICallbackResult } from "@src/utils/Animation";

export const TestAnimation = () => {
	// animationPool.addAnimation('rect_0', new system.animation([[0, 1000], [500, 0, 500]], [0, 50, 100], 10000, 1, 0, 1, rect_0_callback, []));
	// animationPool.addAnimation('rect_1', new system.animation([[0, 1000], [500, 0, 500]], [0, 10, 100], 10000, 1, 0, 1, rect_1_callback, []));
	// animationPool.addAnimation('rect_2', new system.animation([[0, 1000], [500, 0, 500]], [0, 90, 100], 10000, 1, 0, 1, rect_2_callback, []));
	// animationPool.addAnimation('rect_3', new system.animation([[0, 1000], [300, 300]], [0, 10, 50, 90, 100], 10000, 1, 5000, 2, rect_3_callback, []));
	// animationPool.addAnimation('rect_4', new system.animation([[0, 1000], [350, 350]], [0, 100], 10000, 1, 5000, 2, rect_4_callback, []));

	const refAnimations = useRef<Animation[]>([]);

	const refRect0 = useRef<HTMLDivElement>(null);
	const refRect1 = useRef<HTMLDivElement>(null);
	const refRect2 = useRef<HTMLDivElement>(null);
	const refRect3 = useRef<HTMLDivElement>(null);
	const refRect4 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const Animation0 = new Animation({
			points: [
				[0, 500],
				[500, 0, 500],
			],
			time: 1000,
			delay: 0,
			direction: Animation.DIRECTION_FORWARD,
			isCyclic: false,
			repeat: 1,
			timing: Animation.TIMING_LINEAR,
			isDelayOnRepeat: false,
			onCalculate: (result: ICallbackResult) => {
				if (refRect0.current) {
					refRect0.current.style.left = result.results[0] + "px";
					refRect0.current.style.top = result.results[1] + "px";
				}
			},
			callbacks: [],
		});

		Animation0.startLoop();

		refAnimations.current.push(Animation0);

		return () => {
			Animation0.stopLoop();
		};
	}, []);

	const handleStartAnimation = () => {
		refAnimations.current[0].resume();
	};

	const handleStopAnimation = () => {
		refAnimations.current[0].pause();
	};

	const handleResetAnimation = () => {
		refAnimations.current[0].reset();
	};

	return (
		<S.TestAnimation>
			<Text size="l">Test Animation</Text>

			<S.Rect>
				<S.ButtonStart onClick={handleStartAnimation}>START</S.ButtonStart>
				<S.ButtonStop onClick={handleStopAnimation}>STOP</S.ButtonStop>
				<S.ButtonReset onClick={handleResetAnimation}>RESET</S.ButtonReset>

				<S.RectInfo0 />
				<S.RectInfo1 />
				<S.RectInfo2 />
				<S.RectInfo3 />
				<S.RectInfo4 />

				<S.Rect0 ref={refRect0} />
				<S.Rect1 ref={refRect1} />
				<S.Rect2 ref={refRect2} />
				<S.Rect3 ref={refRect3} />
				<S.Rect4 ref={refRect4} />
			</S.Rect>
		</S.TestAnimation>
	);
};
