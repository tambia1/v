import { useEffect, useRef } from "react";
import type { ArenaName as IArenaType } from "./game/Arena";
import { Game } from "./game/Game";
import * as S from "./PageGame.styles";

type Props = {
	arenaType: IArenaType;
};

export const PageGame = ({ arenaType }: Props) => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refBoard.current) {
			const game = new Game({
				board: refBoard.current,
				goodPlayerName: "Player Green",
				badPlayerName: "Player Red",
				arenaType: arenaType,
				onGameOver: () => {
					//on game over
				},
			});

			game.start();
		}
	}, [arenaType]);

	return (
		<S.PageGame>
			<S.BoardBg />
			<S.Board ref={refBoard} />
		</S.PageGame>
	);
};
