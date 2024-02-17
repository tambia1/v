import { useEffect, useRef } from "react";
import * as S from "./ClashRoyaleGame.styles";
import { Game } from "./game/Game";
import { IType as IArenaType } from "./game/Arena";

interface Props {
	arenaType: IArenaType;
}

export const ClashRoyaleGame = ({ arenaType }: Props) => {
	const refBoard = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (refBoard.current) {
			const game = new Game({
				board: refBoard.current,
				goodPlayerName: "Player Good",
				badPlayerName: "Player Bad",
				arenaType: arenaType,
				onGameOver: () => {
					//on game over
				},
			});

			game.start();
		}
	}, []);

	return (
		<S.ClashRoyaleGame>
			<S.ClashRoyaleBoardBg />
			<S.ClashRoyaleBoard ref={refBoard} />
		</S.ClashRoyaleGame>
	);
};
