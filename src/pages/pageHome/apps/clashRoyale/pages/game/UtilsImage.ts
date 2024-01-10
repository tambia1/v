export const UtilsImage = {
	getImage: (url: string) => {
		const image = new Image();
		image.src = url;

		return image;
	},
};
