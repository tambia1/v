const Color = {
	grey: 30,
	red: 31,
	green: 32,
	yellow: 33,
	blue: 34,
	purple: 35,
	cyan: 36,
} as const;

export const log = (color: keyof typeof Color, message: string): void => {
	console.log(`\u001b[${Color[color]}m${message}\u001b[0m`);
};
