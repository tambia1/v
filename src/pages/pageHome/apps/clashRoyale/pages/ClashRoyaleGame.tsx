import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import { Animation } from "./game/Animation";
// import Game from "./Game";

export const ClashRoyaleGame = () => {
	const refBoard = useRef<HTMLDivElement>(null);
	const refDot1 = useRef<HTMLDivElement>(null);
	const refDot2 = useRef<HTMLDivElement>(null);
	const refDot3 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// const game = new Game(refBoard.current, "Player Good", "Player Bad", 1, () => {
		// 	//on game over
		// });
		// game.start();
	}, []);

	useEffect(() => {
		if (refDot1.current) {
			const animation = new Animation({
				timeLength: 5000,
				arrayPoints: [
					[0, 100],
					[200, 100, 200],
				],
				arrayTiming: Animation.TIMING_EASE,
				direction: Animation.DIRECTION_FORWARD,
				delayBeforeStart: 1000,
				isDelayBeforeStartOnRepeat: true,
				numberOfRepeats: 2,
				isCyclic: true,
				calculateCallback: (result) => {
					console.log("---", result.positionInPoints, result.positionInPercent);
					refDot1.current!.style.left = result.arrayResults[0] + "px";
					refDot1.current!.style.top = result.arrayResults[1] + "px";
				},
				callbacks: [
					{
						positionInPoints: 0,
						direction: 1,
						callback(result) {
							console.log("aaa", result.arrayResults[0]);
						},
					},
					{
						positionInPoints: 1,
						direction: 1,
						callback(result) {
							console.log("bbb", result.arrayResults[0]);
						},
					},
					{
						positionInPoints: 1,
						direction: 1,
						callback(result) {
							console.log("ccc", result.arrayResults[0]);
						},
					},
				],
			});

			animation.startLoop();
			animation.resume();
		}
	}, []);

	useEffect(() => {
		if (refDot2.current) {
			const animation = new Animation({
				timeLength: 5000,
				arrayPoints: [
					[0, 100],
					[200, 300, 200],
				],
				arrayTiming: Animation.TIMING_EASE_IN,
				direction: 1,
				delayBeforeStart: 1000,
				isDelayBeforeStartOnRepeat: true,
				numberOfRepeats: 3,
				isCyclic: true,
				calculateCallback: (result) => {
					refDot2.current!.style.left = result.arrayResults[0] + "px";
					refDot2.current!.style.top = result.arrayResults[1] + "px";
				},
				callbacks: [],
			});

			animation.startLoop();
			animation.resume();
		}
	}, []);

	useEffect(() => {
		if (refDot3.current) {
			const animation = new Animation({
				timeLength: 5000,
				arrayPoints: [
					[0, 100],
					[200, 200],
				],
				arrayTiming: Animation.TIMING_EASE_OUT,
				direction: 1,
				delayBeforeStart: 1000,
				isDelayBeforeStartOnRepeat: true,
				numberOfRepeats: 4,
				isCyclic: true,
				calculateCallback: (result) => {
					refDot3.current!.style.left = result.arrayResults[0] + "px";
					refDot3.current!.style.top = result.arrayResults[1] + "px";
				},
				callbacks: [],
			});

			animation.startLoop();
			animation.resume();
		}
	}, []);

	return (
		<S.ClashRoyaleGame>
			<S.ClashRoyaleBoard ref={refBoard} />
			<S.Dot1 ref={refDot1} />
			<S.Dot2 ref={refDot2} />
			<S.Dot3 ref={refDot3} />
		</S.ClashRoyaleGame>
	);
};
