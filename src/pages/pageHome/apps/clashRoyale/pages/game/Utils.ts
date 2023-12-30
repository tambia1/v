const Utils = {
	getImage: (url: string) => {
		const image = new Image();
		image.src = url;

		return image;
	},
};

export default Utils;
