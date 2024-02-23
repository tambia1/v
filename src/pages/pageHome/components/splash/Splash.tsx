import { useLayoutEffect, useRef, useState } from "react";
import * as S from "./Splash.styles";
import { version } from "@src/../package.json";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "../../apps/settings/page/components/theme/Theme.styles";
import { Promises } from "@src/services/Promises";
import { Progress } from "@src/components/progress/Progress";
import { useAnimation } from "@src/hooks/UseAnimation";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const refLogo = useRef(null);
	const refProgress = useRef(null);
	const animationTitle = useAnimation(refLogo);
	const animationProgress = useAnimation(refProgress);
	const [progress, setProgress] = useState(0);

	useLayoutEffect(() => {
		const start = async () => {
			animationTitle.play("hide");
			animationProgress.play("hide");

			await animationTitle.play("appear");
			await animationProgress.play("appear");

			const timeStart = Date.now();

			const arr = [Object.values(Icons), ...backgroundImages.map((item) => item.light), ...backgroundImages.map((item) => item.dark)];

			for (let i = 0; i < arr.length; i++) {
				const urls = (Array.isArray(arr[i]) ? arr[i] : [arr[i]]) as string[];
				await Files.downloadImages(urls);
				setProgress((i / (arr.length - 1)) * 100);
			}

			setProgress(100);

			const timeEnd = Date.now();
			const timeToWait = Math.max(0, 500 - (timeEnd - timeStart)) + 500;
			await Promises.sleep(timeToWait);

			await animationProgress.play("disappear");

			onFinish();
		};

		start();
	}, []);

	return (
		<S.Splash>
			<S.Logo ref={refLogo} />
			<S.Progress ref={refProgress}>
				<Progress progress={progress} />
			</S.Progress>
			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
