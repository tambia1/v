import * as S from "./Tetris.styles";
import { useEffect, useState } from "react";
import { TetrisState, useTetris } from "./tetrisGame/hooks/UseTetris";
import { TetrisGame } from "./tetrisGame/TetrisGame";
import { Button } from "./tetrisGame/components/button/Button";

enum WarState {
	Wait,
	Start,
	Play,
	End,
}

export const Tetris = () => {
	const [warState, setWarState] = useState<WarState>(WarState.Wait);

	const tetris1 = useTetris();

	useEffect(() => {
		switch (warState) {
			case WarState.Wait:
				break;

			case WarState.Start:
				setWarState(WarState.Start);

				tetris1.setState(TetrisState.Reset);

				setTimeout(() => {
					tetris1.setState(TetrisState.Play);
					setWarState(WarState.Play);
				}, 2000);
				break;

			case WarState.Play:
				break;

			case WarState.End:
				tetris1.setState(TetrisState.Pause);
				setWarState(WarState.Wait);
				break;
		}
	}, [warState]);

	useEffect(() => {
		if (tetris1.isGameOver == true) {
			stopWar();
		}
	}, [tetris1.isGameOver]);

	const startWar = () => {
		setWarState(WarState.Start);
	};

	const stopWar = () => {
		setWarState(WarState.End);
	};

	return (
		<S.Tetris>
			<div className="mat">
				<div className="row">
					<div className="col">
						<TetrisGame
							board={tetris1.board}
							next={tetris1.next}
							lines={tetris1.lines}
							onClickUp={tetris1.onClickUp}
							onClickDown={tetris1.onClickDown}
							onClickLeft={tetris1.onClickLeft}
							onClickRight={tetris1.onClickRight}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col hor-align-center margin-top-1">
						<h3>{warState == WarState.End ? "Game Over" : ""}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col hor-align-center margin-top-1">
						<h3>
							{warState == WarState.Wait ? "" : ""}
							{warState == WarState.Start ? "Ready ?" : ""}
							{warState == WarState.Play ? "Play !" : ""}
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="col hor-align-center margin-top-1">{warState == WarState.Wait ? <Button onClick={startWar}>Start</Button> : <></>}</div>
				</div>
			</div>
		</S.Tetris>
	);
};
