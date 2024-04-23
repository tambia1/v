import { Text } from "@src/components/text/Text";
import * as S from "./TestAnimation.styles";
import { useEffect, useState } from "react";
import { Animation, AnimationLooper, ICallbackResult } from "@src/utils/Animation";

export const TestAnimation = () => {
	const [animations, setAnimations] = useState<Animation[]>([]);
	const [animationLooper] = useState<AnimationLooper>(new AnimationLooper());
	const [results, setResults] = useState<ICallbackResult[]>([]);

	useEffect(() => {
		const animation0 = new Animation({
			routes: [
				[0, 300],
				[500, 0, 500],
			],
			time: 10000,
			timing: Animation.TIMING_LINEAR,
			onCalculate: (result: ICallbackResult) => {
				setResults((prevResults) => {
					const newResults = [...prevResults];
					newResults[0] = result;

					return newResults;
				});
			},
			callbacks: [],
		});

		setAnimations([animation0]);

		animationLooper.setAnimations([animation0]);
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
	};

	return (
		<S.TestAnimation>
			<Text size="l">Test Animation</Text>

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

				<S.Rect0 style={{ left: results[0]?.results[0], top: results[0]?.results[1] }} />
				<S.Rect1 style={{ left: results[1]?.results[0], top: results[1]?.results[1] }} />
				<S.Rect2 style={{ left: results[2]?.results[0], top: results[2]?.results[1] }} />
				<S.Rect3 style={{ left: results[3]?.results[0], top: results[3]?.results[1] }} />
				<S.Rect4 style={{ left: results[4]?.results[0], top: results[4]?.results[1] }} />
			</S.Rect>
		</S.TestAnimation>
	);
};
