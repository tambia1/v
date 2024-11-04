import { version } from "@src/../package.json";
import { useAnimation } from "@src/hooks/UseAnimation";
import { Files } from "@src/services/Files";
import { Promises } from "@src/services/Promises";
import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./Splash.styles";
import { getImagesToCache } from "./Splash.utils";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const refLogo = useRef(null);
	const refProgress = useRef(null);
	const animationLogo = useAnimation(refLogo);
	const animationProgress = useAnimation(refProgress);
	const [progress, setProgress] = useState(0);

	useLayoutEffect(() => {
		const start = async () => {
			animationLogo.play("hide");
			animationProgress.play("hide");

			await animationLogo.play("appear");
			await animationProgress.play("appear");

			const timeStart = Date.now();

			const imagesToCache = getImagesToCache();

			for (let i = 0; i < imagesToCache.length; i++) {
				const urls = imagesToCache[i];
				await Files.downloadImages(urls);

				setProgress((i / (imagesToCache.length - 1)) * 100);
			}

			setProgress(100);

			const timeEnd = Date.now();
			const timeToWait = Math.max(0, 500 - (timeEnd - timeStart)) + 500;
			await Promises.sleep(timeToWait);

			await animationProgress.play("disappear");

			onFinish();
		};

		start();
	}, [animationLogo.play, animationProgress.play, onFinish]);

	return (
		<S.Splash>
			<S.Logo ref={refLogo} role="img" aria-label="logo" />
			<S.ProgressContainer ref={refProgress}>
				<S.Progress percent={progress} />
			</S.ProgressContainer>
			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
