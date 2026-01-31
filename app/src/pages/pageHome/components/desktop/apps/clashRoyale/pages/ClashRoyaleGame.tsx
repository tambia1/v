import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import type { ArenaType } from "./game/Arena";
import { Game } from "./game/Game";

type Props = {
	arenaType: ArenaType;
};

export const ClashRoyaleGame = ({ arenaType }: Props) => {
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
		<S.ClashRoyaleGame>
			<S.ClashRoyaleBoardBg />
			<S.ClashRoyaleBoard ref={refBoard} />
		</S.ClashRoyaleGame>
	);
};
