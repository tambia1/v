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
			const animation = new Animation(
				5000,
				[
					[0, 100],
					[200, 100, 200],
				],
				Animation.TIMING_EASE,
				1,
				1000,
				true,
				2,
				true,
				(result) => {
					console.log("---", result);
					refDot1.current!.style.left = result.arrayResults[0] + "px";
					refDot1.current!.style.top = result.arrayResults[1] + "px";
				},
				[
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
				]
			);

			animation.startLoop();
			animation.resume();
		}
	}, []);

	useEffect(() => {
		if (refDot2.current) {
			const animation = new Animation(
				5000,
				[
					[0, 100],
					[200, 300, 200],
				],
				Animation.TIMING_EASE_IN,
				1,
				1000,
				true,
				3,
				true,
				(result) => {
					refDot2.current!.style.left = result.arrayResults[0] + "px";
					refDot2.current!.style.top = result.arrayResults[1] + "px";
				},
				[]
			);

			animation.startLoop();
			animation.resume();
		}
	}, []);

	useEffect(() => {
		if (refDot3.current) {
			const animation = new Animation(
				5000,
				[
					[0, 100],
					[200, 200],
				],
				Animation.TIMING_EASE_OUT,
				1,
				1000,
				true,
				4,
				true,
				(result) => {
					refDot3.current!.style.left = result.arrayResults[0] + "px";
					refDot3.current!.style.top = result.arrayResults[1] + "px";
				},
				[]
			);

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
