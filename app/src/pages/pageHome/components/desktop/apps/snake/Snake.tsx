import { Button } from "@src/components/button/Button";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./Snake.styles";
import { Game } from "./game/Game";

export const Snake = () => {
	const refBoards = useMemo(
		() => [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)],
		[],
	);
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
	}, [refBoards]);

	const handleOnClickStart = () => {
		refGames.current.forEach((game) => game.start());
	};

	const handleOnClickReset = () => {
		refGames.current.forEach((game) => game.reset());
	};

	return (
		<S.Snake>
			<S.Buttons>
				<Button onClick={handleOnClickStart}>Start</Button>
				<Button onClick={handleOnClickReset}>Reset</Button>
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
