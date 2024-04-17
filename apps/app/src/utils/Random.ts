export const getRandomNumber = (minInclude: number, maxInclude: number) => {
	return Math.floor(Math.random() * (maxInclude - minInclude + 1)) + minInclude;
};
