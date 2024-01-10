const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

const find = (x1: number, y1: number, value: number, grid: number[][]) => {
	let x2 = -1;
	let y2 = -1;
	let distanceMin = Number.MAX_VALUE;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] == value) {
				let distance = getDistance(x1, y1, x, y);

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

type IStack = {
	[key: string]: {
		x: number;
		y: number;
		f: number;
		h: number;
		g: number;
		v: boolean;
		px: number;
		py: number;
	};
};

const path = (x1: number, y1: number, x2: number, y2: number, grid: number[][]) => {
	let calcDistance = (x1: number, y1: number, x2: number, y2: number) => {
		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	};

	let calcNeighbours = (x: number, y: number, stack: IStack) => {
		stack[x + "," + y].v = true;

		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (stack[x + j + "," + (y + i)] == undefined && grid[y + i]?.[x + j] != undefined) {
					let g = calcDistance(x1, y1, x + j, y + i);
					let h = calcDistance(x2, y2, x + j, y + i);
					let f = g + h;

					if (grid[y + i][x + j] == 0 || h == 0) {
						stack[x + j + "," + (y + i)] = { x: x + j, y: y + i, f: f, h: h, g: g, v: false, px: x, py: y };
					}
				}
			}
		}
	};

	let getNextStack = () => {
		let nextStack = null;
		let maxF = Number.MAX_VALUE;
		let minH = Number.MAX_VALUE;

		for (let k in stack) {
			if (stack[k].v == false && stack[k].f <= maxF && stack[k].h <= minH) {
				nextStack = stack[k];
				maxF = stack[k].f;
				minH = stack[k].h;
			}
		}

		return nextStack;
	};

	let stack: IStack = {
		[x1 + "," + y1]: { x: x1, y: y1, f: 0, h: 0, g: 0, v: false, px: x1, py: y1 },
	};

	let nextStack = null;

	do {
		nextStack = getNextStack();
		calcNeighbours(nextStack?.x || 0, nextStack?.y || 0, stack);
	} while (nextStack?.x != x2 || nextStack?.y != y2);

	let path = [];

	do {
		path.unshift(nextStack);
		nextStack = stack[nextStack.px + "," + nextStack.py];
	} while (nextStack.x != x1 || nextStack.y != y1);

	path.unshift(nextStack);

	return path;
};

export const UtilsPath = {
	find,
	path,
};
