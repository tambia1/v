export const colors = {
	grey: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	purple: 35,
	cyan: 36,
};

export const log = (color, message) => {
	console.log(`\u001b[${color}m${message}\u001b[0m`);
};
