const downloadImages = (urls: string[]) => {
	return Promise.all(
		urls.map(
			(url) =>
				new Promise<void>((resolve, reject) => {
					const image = new Image();
					image.onload = () => resolve();
					image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
					image.src = url;
				})
		)
	);
};

export const Files = {
	downloadImages,
};
