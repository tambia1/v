import { Button } from "@src/components/button/Button";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./Snake.styles";
import { Game } from "./game/Game";

export const Snake = () => {
	const refBoards = useMemo(() => [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)], []);
	const refGames = useRef<Game[]>([]);

	useEffect(() => {
		if (refGames.current.length > 0) {
			return;
		}

		refBoards.forEach((boardRef, index) => {
			if (boardRef.current) {
				refGames.current[index] = new Game({
					board: boardRef.current,
					onGameOver: () => {
						// on game over
					},
				});
			}
		});

		return () => {
			refGames.current.forEach((game) => game.destroy());
		};
	}, [refBoards]);

	const handleOnClickStart = () => {
		refGames.current.forEach((game) => game.start());
	};

	const handleOnClickStop = () => {
		refGames.current.forEach((game) => game.stop());
	};

	const handleOnClickReset = () => {
		refGames.current.forEach((game) => game.reset());
	};

	return (
		<S.Snake>
			<S.Buttons>
				<Button onClick={handleOnClickStart}>Start</Button>
				<Button onClick={handleOnClickStop}>Stop</Button>
				<Button onClick={handleOnClickReset}>Reset</Button>
			</S.Buttons>

			<S.Container>
				<S.Board ref={refBoards[0]} />
				<S.Board ref={refBoards[1]} />
			</S.Container>
		</S.Snake>
	);
};
