import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import type { IType as IArenaType } from "./game/Arena";
import { Game } from "./game/Game";

interface Props {
	arenaType: IArenaType;
}

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
