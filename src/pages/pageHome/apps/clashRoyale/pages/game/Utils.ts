const Utils = {
	getImage: (url: string) => {
		const image = new Image();
		image.src = url;

		return image;
	},

	getRandomNumber: (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
};

export default Utils;
