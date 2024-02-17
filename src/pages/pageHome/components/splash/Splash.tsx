import { useEffect, useState } from "react";
import * as S from "./Splash.styles";
import { version } from "@src/../package.json";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "../../apps/settings/page/components/theme/Theme.styles";
import { Promises } from "@src/services/Promises";
import { Animate } from "@src/components/animate/Animate";
import { Progress } from "@src/components/progress/Progress";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const animateTitle = useAnimate("hide");
	const animateProgress = useAnimate("hide");
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const start = async () => {
			await Promises.sleep(300);

			await animateTitle.current.play("appear");
			await animateProgress.current.play("appear");

			const timeStart = new Date().getTime();

			const arr = [...Object.values(Icons), ...backgroundImages.map((item) => item.light), ...backgroundImages.map((item) => item.dark)];

			for (let i = 0; i < arr.length; i++) {
				await Files.downloadImages([arr[i]]);
				setProgress((i / (arr.length - 1)) * 100);
			}

			setProgress(100);

			await animateProgress.current.play("disappear");

			const timeEnd = new Date().getTime();
			const timeToWait = Math.max(0, 1500 - (timeEnd - timeStart));

			await Promises.sleep(timeToWait);

			onFinish();
		};

		start();
	}, []);

	return (
		<S.Splash>
			<Animate useAnimate={animateTitle}>
				<S.Logo />
			</Animate>
			<Animate useAnimate={animateProgress}>
				<S.Progress>
					<Progress progress={progress} />
				</S.Progress>
			</Animate>
			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
