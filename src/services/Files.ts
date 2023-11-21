type IOnProgress = (props: { loads: string[]; errors: string[]; progress: number; fileName: string; status: string; loadTime: number }) => void;

const download = (urls: string[], onProgress: IOnProgress, onFinish: IOnProgress) => {
	let loads: string[] = [];
	let errors: string[] = [];

	let totalFiles = urls.length;

	let checkProgress = (fileName: string, status: "ok" | "error", loadTime: number) => {
		let progress = (loads.length + errors.length + 0.001) / (totalFiles + 0.001);
		onProgress?.({ loads, errors, progress, fileName, status, loadTime });

		if (loads.length + errors.length >= totalFiles) {
			onFinish?.({ loads, errors, progress, fileName, status, loadTime });
		}
	};

	let onLoad = (fileIndex: number, startTime: number) => {
		let endTime = new Date().getTime();
		let loadTime = endTime - startTime;

		loads.push(urls[fileIndex]);
		checkProgress(urls[fileIndex], "ok", loadTime);
	};

	let onError = (fileIndex: number, startTime: number) => {
		let endTime = new Date().getTime();
		let loadTime = endTime - startTime;

		errors.push(urls[fileIndex]);
		checkProgress(urls[fileIndex], "error", loadTime);
	};

	let loadUrl = () => {
		let fragment = document.createDocumentFragment();

		for (let i = 0; i < urls.length; i++) {
			let url = urls[i];
			let startTime = new Date().getTime();

			if (/\.(js)$/.test(url)) {
				let script = document.createElement("script");
				script.type = "text/javascript";
				script.src = url;
				script.onload = () => onLoad(i, startTime);
				script.onerror = () => onError(i, startTime);

				fragment.appendChild(script);
			} else if (/\.(css)$/.test(url)) {
				let link = document.createElement("link");
				link.type = "text/css";
				link.rel = "stylesheet";
				link.href = url;
				link.onload = () => onLoad(i, startTime);
				link.onerror = () => onError(i, startTime);

				fragment.appendChild(link);
			} else if (/\.(ttf)$/.test(url)) {
				let link = document.createElement("link");
				link.type = "font/ttf";
				link.rel = "preload";
				link.href = url;
				link.as = "font";
				link.onload = () => onLoad(i, startTime);
				link.onerror = () => onError(i, startTime);

				fragment.appendChild(link);
			} else if (/\.(png|jpeg|webp|jpg|svg)$/.test(url)) {
				let image = new Image();
				image.onload = () => onLoad(i, startTime);
				image.onerror = () => onError(i, startTime);
				image.src = url;
			} else {
				errors.push(urls[i]);
			}
		}

		document.head.appendChild(fragment);
	};

	loadUrl();
};

export const Files = {
	download,
};
