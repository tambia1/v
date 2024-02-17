const downloadImages = (urls: string[]) => {
	return Promise.all(
		urls.map(
			(url) =>
				new Promise<void>((resolve) => {
					const image = new Image();
					image.onload = image.onerror = () => {
						resolve();
					};
					image.src = url;
				})
		)
	);
};

export const Files = {
	downloadImages,
};
