import { Button } from "@src/components/button/Button";
import { useEffect, useRef } from "react";
import * as S from "./Snake.styles";
import { Game } from "./game/Game";

export const Snake = () => {
	const refBoard = useRef<HTMLDivElement>(null);
	const refGame = useRef<Game | null>(null);

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

		refGame.current = game;

		return () => {
			game.destroy();
		};
	}, []);

	const handleOnClickStart = () => {
		if (refGame.current) {
			refGame.current.start();
		}
	};

	const handleOnClickStop = () => {
		if (refGame.current) {
			refGame.current.stop();
		}
	};

	const handleOnClickReset = () => {
		if (refGame.current) {
			refGame.current.reset();
		}
	};

	return (
		<S.Snake>
			<S.Buttons>
				<Button onClick={handleOnClickStart}>Start</Button>
				<Button onClick={handleOnClickStop}>Stop</Button>
				<Button onClick={handleOnClickReset}>Reset</Button>
			</S.Buttons>

			<S.Container>
				<S.Board ref={refBoard} />
			</S.Container>
		</S.Snake>
	);
};
