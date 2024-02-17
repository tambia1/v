import { useEffect, useRef, useState } from "react";
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
	const animateTitle = useAnimation(refLogo);
	const animateProgress = useAnimation(refProgress);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const start = async () => {
			animateTitle.play("hide");
			animateProgress.play("hide");

			await Promises.sleep(300);

			await animateTitle.play("appear");
			await animateProgress.play("appear");

			const timeStart = Date.now();

			const arr = [...Object.values(Icons), ...backgroundImages.map((item) => item.light), ...backgroundImages.map((item) => item.dark)];

			for (let i = 0; i < arr.length; i++) {
				await Files.downloadImages([arr[i]]);
				setProgress((i / (arr.length - 1)) * 100);
			}

			setProgress(100);

			await animateProgress.play("disappear");

			const timeEnd = Date.now();
			const timeToWait = Math.max(0, 500 - (timeEnd - timeStart));

			await Promises.sleep(timeToWait);

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
