import { Button } from "@src/components/button/Button";
import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./Snake.styles";
import { Game } from "./game/Game";

export const Snake = () => {
	const refBoards = [
		useRef<HTMLDivElement | null>(null),
		useRef<HTMLDivElement | null>(null),
		useRef<HTMLDivElement | null>(null),
		useRef<HTMLDivElement | null>(null),
	];
	const refGames = useRef<Game[]>([]);
	const [gameState, setGameState] = useState<"start" | "reset">("start");

	useLayoutEffect(() => {
		if (refGames.current.length > 0) {
			return;
		}

		refBoards.forEach((boardRef, index) => {
			if (boardRef.current) {
				refGames.current[index] = new Game({
					board: boardRef.current,
					onGameOver: () => {
						refGames.current.forEach((game, i) => {
							if (i !== index) {
								game.stop();
							}
						});
					},
				});
			}
		});

		return () => {
			refGames.current.forEach((game) => game.destroy());
		};
	}, [refBoards[0], refBoards[1], refBoards[2], refBoards[3]]);

	const handleOnClickStart = () => {
		setGameState("reset");
		refGames.current.forEach((game) => game.start());
	};

	const handleOnClickReset = () => {
		setGameState("start");
		refGames.current.forEach((game) => game.reset());
	};

	return (
		<S.Snake>
			<S.Buttons>
				{gameState === "start" && <Button onClick={handleOnClickStart}>Start</Button>}
				{gameState === "reset" && <Button onClick={handleOnClickReset}>Reset</Button>}
			</S.Buttons>

			<S.Container>
				<S.Board ref={refBoards[0]} />
				<S.Board ref={refBoards[1]} />
				<S.Board ref={refBoards[2]} />
				<S.Board ref={refBoards[3]} />
			</S.Container>
		</S.Snake>
	);
};
