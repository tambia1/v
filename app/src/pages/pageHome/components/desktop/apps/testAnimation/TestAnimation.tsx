import { Text } from "@src/components/text/Text";
import { Animation, AnimationLooper, type ICallbackResult } from "@src/utils/Animation";
import { useEffect, useRef, useState } from "react";
import * as S from "./TestAnimation.styles";

export const TestAnimation = () => {
	const [animations, setAnimations] = useState<Animation[]>([]);
	const [animationLooper] = useState<AnimationLooper>(new AnimationLooper());
	const [results, setResults] = useState<ICallbackResult[]>([]);
	const animation4Counter = useRef(0);
	const animation5Counter = useRef(0);

	useEffect(() => {
		const animation0 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000,
			timing: Animation.TIMING_LINEAR,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[0] = callbackResult;

					return newResults;
				});
			},
			callbacks: [],
		});

		const animation1 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000,
			timing: Animation.TIMING_EASE,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[1] = callbackResult;

					return newResults;
				});
			},
			callbacks: [],
		});

		const animation2 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000,
			timing: Animation.TIMING_EASE_IN,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[2] = callbackResult;

					return newResults;
				});
			},
			callbacks: [],
		});

		const animation3 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000,
			timing: Animation.TIMING_EASE_OUT,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[3] = callbackResult;

					return newResults;
				});
			},
			callbacks: [],
		});

		const animation4 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000 / 3,
			timing: Animation.TIMING_EASE,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[4] = callbackResult;

					return newResults;
				});
			},
			callbacks: [
				{
					position: 10000 / 3,
					callback: (callbackResult: ICallbackResult) => {
						if (animation4Counter.current === 0) {
							callbackResult.animation.setRoutes([
								[300, 0],
								[500, 0, 500],
							]);
						}

						if (animation4Counter.current === 1) {
							callbackResult.animation.setRoutes([
								[0, 300],
								[500, 0, 500],
							]);
						}

						if (animation4Counter.current < 2) {
							callbackResult.animation.resume();
						}

						animation4Counter.current++;
					},
				},
			],
		});

		const animation5 = new Animation({
			routes: [
				[0, 100],
				[500, 200],
			],
			time: 10000 / 4,
			timing: Animation.TIMING_EASE,
			onCalculate: (callbackResult: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[4] = callbackResult;

					return newResults;
				});
			},
			callbacks: [
				{
					position: 10000 / 4,
					callback: (callbackResult: ICallbackResult) => {
						if (animation5Counter.current === 0) {
							callbackResult.animation.setRoutes([
								[100, 100],
								[200, 400],
							]);
						}

						if (animation5Counter.current === 1) {
							callbackResult.animation.setRoutes([
								[100, 200],
								[400, 400],
							]);
						}

						if (animation5Counter.current === 2) {
							callbackResult.animation.setRoutes([
								[200, 300],
								[400, 400, 500],
							]);
						}

						if (animation5Counter.current < 3) {
							callbackResult.animation.resume();
						}

						animation5Counter.current++;
					},
				},
			],
		});

		const animationList = [animation0, animation1, animation2, animation3, animation4, animation5];
		setAnimations(animationList);

		animationLooper.setAnimations(animationList);
		animationLooper.startLoop();

		return () => {
			animationLooper.stopLoop();
		};
	}, []);

	const handleResumeAnimation = () => {
		animations.forEach((animation) => animation.resume());
	};

	const handleStopAnimation = () => {
		animations.forEach((animation) => animation.pause());
	};

	const handleResetAnimation = () => {
		animations.forEach((animation) => animation.reset());
		animation4Counter.current = 0;
		animation5Counter.current = 0;
	};

	return (
		<S.TestAnimation>
			<Text variant="header">Test Animation</Text>

			<S.Spacer />

			<S.Rect>
				<S.ButtonResume onClick={handleResumeAnimation}>RESUME</S.ButtonResume>
				<S.ButtonStop onClick={handleStopAnimation}>STOP</S.ButtonStop>
				<S.ButtonReset onClick={handleResetAnimation}>RESET</S.ButtonReset>

				<S.RectInfo0>
					{results[0]?.results[0].toFixed(2).padStart(6, "0")} , {results[0]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_LINEAR
				</S.RectInfo0>
				<S.RectInfo1>
					{results[1]?.results[0].toFixed(2).padStart(6, "0")} , {results[1]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_EASE
				</S.RectInfo1>
				<S.RectInfo2>
					{results[2]?.results[0].toFixed(2).padStart(6, "0")} , {results[2]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_EASE_IN
				</S.RectInfo2>
				<S.RectInfo3>
					{results[3]?.results[0].toFixed(2).padStart(6, "0")} , {results[3]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_EASE_OUT
				</S.RectInfo3>
				<S.RectInfo4>
					{results[4]?.results[0].toFixed(2).padStart(6, "0")} , {results[4]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_EASE , repeat
				</S.RectInfo4>
				<S.RectInfo5>
					{results[5]?.results[0].toFixed(2).padStart(6, "0")} , {results[4]?.results[1].toFixed(2).padStart(6, "0")} , TIMING_EASE , repeat
				</S.RectInfo5>

				<S.Rect0 style={{ left: results[0]?.results[0], top: results[0]?.results[1] }} />
				<S.Rect1 style={{ left: results[1]?.results[0], top: results[1]?.results[1] }} />
				<S.Rect2 style={{ left: results[2]?.results[0], top: results[2]?.results[1] }} />
				<S.Rect3 style={{ left: results[3]?.results[0], top: results[3]?.results[1] }} />
				<S.Rect4 style={{ left: results[4]?.results[0], top: results[4]?.results[1] }} />
				<S.Rect5 style={{ left: results[4]?.results[0], top: results[4]?.results[1] }} />
			</S.Rect>
		</S.TestAnimation>
	);
};
