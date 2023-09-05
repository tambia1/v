const bezier2p = function (t: number, p0: number, p1: number) {
	return p0 + t * (p1 - p0);
};
const bezier3p = function (t: number, p0: number, p1: number, p2: number) {
	return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
};
const bezier4p = function (t: number, p0: number, p1: number, p2: number, p3: number) {
	return (1 - t) * (1 - t) * (1 - t) * p0 + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * p3;
};
const bezier5p = function (t: number, p0: number, p1: number, p2: number, p3: number, p4: number) {
	return p0 * (1 - t) * (1 - t) * (1 - t) * (1 - t) + 4 * p1 * t * (1 - t) * (1 - t) * (1 - t) + 6 * p2 * t * t * (1 - t) * (1 - t) + 4 * p3 * t * t * t * (1 - t) + p4 * t * t * t * t;
};
const bezier6p = function (t: number, p0: number, p1: number, p2: number, p3: number, p4: number, p5: number) {
	return (
		p0 * (1 - t) * (1 - t) * (1 - t) * (1 - t) * (1 - t) +
		5 * p1 * t * (1 - t) * (1 - t) * (1 - t) * (1 - t) +
		10 * p2 * t * t * (1 - t) * (1 - t) * (1 - t) +
		10 * p3 * t * t * t * (1 - t) * (1 - t) +
		5 * p4 * t * t * t * t * (1 - t) +
		p5 * t * t * t * t * t
	);
};

export const bezier1D = (t: number, arrayPoints: number[]) => {
	let arrayResults = 0;

	switch (arrayPoints.length) {
		case 2:
			arrayResults = bezier2p(t, arrayPoints[0], arrayPoints[1]);
			break;
		case 3:
			arrayResults = bezier3p(t, arrayPoints[0], arrayPoints[1], arrayPoints[2]);
			break;
		case 4:
			arrayResults = bezier4p(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3]);
			break;
		case 5:
			arrayResults = bezier5p(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4]);
			break;
		case 6:
			arrayResults = bezier6p(t, arrayPoints[0], arrayPoints[1], arrayPoints[2], arrayPoints[3], arrayPoints[4], arrayPoints[5]);
			break;
		default:
			throw "Error in bezier1D(): too many points.";
			break;
	}

	return arrayResults;
};

export const bezierND = function (t: number, arrayPoints: number[][]) {
	let arrayResults = [];

	for (let i = 0; i < arrayPoints.length; i++) {
		arrayResults[i] = bezier1D(t, arrayPoints[i]);
	}

	return arrayResults;
};
