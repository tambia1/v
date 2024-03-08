import { Box } from "../box/Box";

interface Props {
	onClickUpLeft: () => void;
	onClickUpRight: () => void;
	onClickLeft: () => void;
	onClickDown: () => void;
	onClickRight: () => void;
}

export const Controls = ({ onClickUpLeft, onClickUpRight, onClickLeft, onClickDown, onClickRight }: Props) => {
	const isTouchDevice = "ontouchstart" in window ? true : false;

	return (
		<>
			<div className="mat">
				<div className="row">
					<div className="col hor-align-center">
						<h3>Controls</h3>
					</div>
				</div>
				<div className="row">
					<div className="col hor-align-center">
						<div className="mat control-buttons">
							<div className="row">
								<div className="col" onMouseDown={() => !isTouchDevice && onClickUpLeft} onTouchStart={() => isTouchDevice && onClickUpLeft}>
									<Box color={-1}>&#x21B0;</Box>
								</div>
								<div className="col"></div>
								<div className="col" onMouseDown={() => !isTouchDevice && onClickUpRight} onTouchStart={() => isTouchDevice && onClickUpRight}>
									<Box color={-1}>&#x21B1;</Box>
								</div>
							</div>
							<div className="row">
								<div className="col" onMouseDown={() => !isTouchDevice && onClickLeft} onTouchStart={() => isTouchDevice && onClickLeft}>
									<Box color={-1}>&larr;</Box>
								</div>
								<div className="col"></div>
								<div className="col" onMouseDown={() => !isTouchDevice && onClickRight} onTouchStart={() => isTouchDevice && onClickRight}>
									<Box color={-1}>&rarr;</Box>
								</div>
							</div>
							<div className="row">
								<div className="col"></div>
								<div className="col" onMouseDown={() => !isTouchDevice && onClickDown} onTouchStart={() => isTouchDevice && onClickDown}>
									<Box color={-1}>&darr;</Box>
								</div>
								<div className="col"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
