import { Box } from "../box/Box";

interface Props {
	onClickUpLeft: () => void;
	onClickUpRight: () => void;
	onClickLeft: () => void;
	onClickDown: () => void;
	onClickRight: () => void;
}

export const Controls = (props: Props) => {
	const { onClickUpLeft, onClickUpRight, onClickLeft, onClickDown, onClickRight } = props;

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
								<div className="col" onClick={onClickUpLeft}>
									<Box color={-1}>&uarr;</Box>
								</div>
								<div className="col"></div>
								<div className="col" onClick={onClickUpRight}>
									<Box color={-1}>&uarr;</Box>
								</div>
							</div>
							<div className="row">
								<div className="col" onClick={onClickLeft}>
									<Box color={-1}>&larr;</Box>
								</div>
								<div className="col"></div>
								<div className="col" onClick={onClickRight}>
									<Box color={-1}>&rarr;</Box>
								</div>
							</div>
							<div className="row">
								<div className="col"></div>
								<div className="col" onClick={onClickDown}>
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
