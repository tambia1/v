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

	const onDown = (onClickUpLeft: () => void) => {
		return {
			[isTouchDevice ? "onTouchStart" : "onMouseDown"]: onClickUpLeft,
		};
	};

	return (
		<div className="mat">
			<div className="row">
				<div className="col hor-align-center">
					<h3>Controls</h3>
				</div>
			</div>
			<div className="row">
				<div className="col hor-align-center">
					<div className="mat control-buttons gap-1">
						<div className="row gap-1">
							<div className="col " {...onDown(onClickUpLeft)}>
								<Box color={-1}>&#x21B0;</Box>
							</div>
							<div className="col" />
							<div className="col " {...onDown(onClickUpRight)}>
								<Box color={-1}>&#x21B1;</Box>
							</div>
						</div>
						<div className="row gap-1">
							<div className="col " {...onDown(onClickLeft)}>
								<Box color={-1}>&larr;</Box>
							</div>
							<div className="col" />
							<div className="col " {...onDown(onClickRight)}>
								<Box color={-1}>&rarr;</Box>
							</div>
						</div>
						<div className="row gap-1">
							<div className="col" />
							<div className="col " {...onDown(onClickDown)}>
								<Box color={-1}>&darr;</Box>
							</div>
							<div className="col" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
