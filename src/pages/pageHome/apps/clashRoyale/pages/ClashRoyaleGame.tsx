import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import { Game } from "./game/Game";

export const ClashRoyaleGame = () => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refBoard.current) {
			const game = new Game({
				board: refBoard.current,
				goodPlayerName: "Player Good",
				badPlayerName: "Player Bad",
				arenaType: "arena1",
				onGameOver: () => {
					//on game over
				},
			});

			game.start();
		}
	}, []);

	return (
		<S.ClashRoyaleGame>
			<S.ClashRoyaleBoardBg />
			<S.ClashRoyaleBoard ref={refBoard} />
		</S.ClashRoyaleGame>
	);
};
