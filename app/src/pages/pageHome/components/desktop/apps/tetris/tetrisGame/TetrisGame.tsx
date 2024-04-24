import { Board } from "./components/board/Board";
import { Controls } from "./components/controls/Controls";
import { Lines } from "./components/lines/Lines";
import { Next } from "./components/next/Next";
import "./TetrisGame.css";

interface Props {
	board: number[][];
	next: number[][];

	lines: number;

	onClickUpLeft: () => void;
	onClickUpRight: () => void;
	onClickDown: () => void;
	onClickLeft: () => void;
	onClickRight: () => void;
}

export const TetrisGame = (props: Props) => {
	const { board, next, lines, onClickUpLeft, onClickUpRight, onClickDown, onClickLeft, onClickRight } = props;

	return (
		<>
			<div className="mat">
				<div className="row">
					<div className="col">
						<h3>Tetris</h3>
					</div>
				</div>
				<div className="row">
					<div className="col margin-right-1">
						<Board board={board} />
					</div>
					<div className="col margin-left-1">
						<div className="mat">
							<div className="row">
								<div className="col hor-align-center">
									<Next next={next} />
								</div>
							</div>
							<div className="row margin-top-1">
								<div className="col hor-align-center">
									<Lines lines={lines} />
								</div>
							</div>

							<div className="row">
								<div className="col">
									<Controls onClickUpLeft={onClickUpLeft} onClickUpRight={onClickUpRight} onClickLeft={onClickLeft} onClickDown={onClickDown} onClickRight={onClickRight} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
