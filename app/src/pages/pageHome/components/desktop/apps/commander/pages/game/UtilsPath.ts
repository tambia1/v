const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const findClosestXYOfValue = (x1: number, y1: number, value: number, grid: number[][]) => {
	let x2 = -1;
	let y2 = -1;
	let distanceMin = Number.MAX_VALUE;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === value) {
				const distance = getDistance(x1, y1, x, y);

				if (distance < distanceMin) {
					x2 = x;
					y2 = y;
					distanceMin = distance;
				}
			}
		}
	}

	return { x: x2, y: y2 };
};

type Stack = {
	[key: string]: {
		x: number;
		y: number;
		d1: number;
		d2: number;
		v: boolean;
		px: number;
		py: number;
	};
};

const findPath = (x1: number, y1: number, x2: number, y2: number, grid: number[][]) => {
	const calcDistance = (x1: number, y1: number, x2: number, y2: number) => {
		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	};

	const calcNeighbours = (x: number, y: number, stack: Stack) => {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (stack[`${x + j},${y + i}`] === undefined && grid[y + i]?.[x + j] !== undefined) {
					const d1 = calcDistance(x1, y1, x + j, y + i);
					const d2 = calcDistance(x2, y2, x + j, y + i);

					if (grid[y + i][x + j] === 0 || d2 === 0) {
						stack[`${x + j},${y + i}`] = { x: x + j, y: y + i, d1, d2, v: false, px: x, py: y };
					}
				}
			}
		}
	};

	const getNextStack = (stack: Stack) => {
		let nextStack = null;
		let maxd2 = Number.MAX_VALUE;

		for (const k in stack) {
			if (stack[k].v === false && stack[k].d2 <= maxd2) {
				nextStack = stack[k];
				maxd2 = stack[k].d2;
			}
		}

		return nextStack;
	};

	const stack: Stack = {};
	calcNeighbours(x1, y1, stack);

	let nextStack = null;

	do {
		nextStack = getNextStack(stack);

		if (nextStack != null) {
			stack[`${nextStack.x},${nextStack.y}`].v = true;
			calcNeighbours(nextStack.x || 0, nextStack.y || 0, stack);
		}
	} while ((nextStack?.x !== x2 || nextStack?.y !== y2) && nextStack != null);

	const path = [];

	do {
		if (nextStack != null) {
			path.unshift(nextStack);
			nextStack = stack[`${nextStack.px},${nextStack.py}`];
		}
	} while ((nextStack?.x !== x1 || nextStack?.y !== y1) && nextStack != null);

	if (nextStack != null) {
		path.unshift(nextStack);
	}

	return path;
};

export const UtilsPath = {
	findClosestXYOfValue,
	findPath,
};
