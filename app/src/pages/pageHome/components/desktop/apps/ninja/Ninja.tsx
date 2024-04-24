import { useEffect, useRef } from "react";
import * as S from "./Ninja.styles";
import { Game } from "./pages/game/Game";

export const Ninja = () => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let game: Game | null = null;

		if (refBoard.current) {
			game = new Game({ board: refBoard.current });

			game.startGame();
		}

		return () => {
			if (game) {
				game.stopGame();
			}
		};
	}, []);

	return (
		<S.NinjaGame>
			<S.Board ref={refBoard} />
			<S.Grass />
		</S.NinjaGame>
	);
};
