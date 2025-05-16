import { useEffect, useRef } from "react";
import * as S from "./Snake.styles";
import { Game } from "./game/Game";

export const Snake = () => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refBoard.current === null) {
			return;
		}

		const game = new Game({
			board: refBoard.current,
			onGameOver: () => {
				//on game over
			},
		});

		game.start();

		return () => {
			game.destroy();
		};
	}, []);

	return (
		<S.Snake>
			<S.Container>
				<S.Board ref={refBoard} />
			</S.Container>
		</S.Snake>
	);
};
