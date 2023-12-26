import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import Game from "./Game";

export const ClashRoyaleGame = () => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const game = new Game(refBoard.current, "Player Good", "Player Bad", 1, () => {
			//on game over
		});
		game.start();
	}, []);

	return (
		<S.ClashRoyaleGame>
			<S.ClashRoyaleBoard ref={refBoard} />
		</S.ClashRoyaleGame>
	);
};
