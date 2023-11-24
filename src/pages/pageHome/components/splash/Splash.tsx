import { useEffect, useState } from "react";
import * as S from "./Splash.styles";
import { lang } from "@src/locales/i18n";
import { version } from "@src/../package.json";
import { T } from "@src/locales/T";
import { Progress } from "@src/components/progress/Progress";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { Promises } from "@src/services/Promises";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const [progress, setProgress] = useState(0);
	const animateTitle = useAnimate("show");
	const animateProgress = useAnimate("show");

	const downloadImages = async () => {
		return new Promise<void>((resolve) => {
			Files.download(
				Object.values(Icons),
				(props) => {
					setProgress(props.progress * 100);
				},
				() => {
					resolve();
				}
			);
		});
	};

	useEffect(() => {
		const start = async () => {
			await downloadImages();
			await animateProgress.current.play("disappear");
			await Promises.sleep(500);
			await animateTitle.current.play("disappear");
			onFinish();
		};

		start();
	}, []);

	return (
		<S.Splash>
			<S.Title useAnimate={animateTitle}>
				<T>{lang.splash.title}</T>
			</S.Title>

			<S.Progress useAnimate={animateProgress}>
				<Progress progress={progress} />
			</S.Progress>
			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
