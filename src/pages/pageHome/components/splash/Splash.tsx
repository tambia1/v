import { useEffect } from "react";
import * as S from "./Splash.styles";
import { version } from "@src/../package.json";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "../../apps/settings/page/components/theme/Theme.styles";
import { Promises } from "@src/services/Promises";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const animateTitle = useAnimate("hide");

	useEffect(() => {
		const start = async () => {
			await Promises.sleep(300);
			await animateTitle.current.play("appear");

			const timeStart = new Date().getTime();

			await Promise.all([
				Files.downloadImages(Object.values(Icons)),
				Files.downloadImages(backgroundImages.map((item) => item.light)),
				Files.downloadImages(backgroundImages.map((item) => item.dark)),
			]);

			const timeEnd = new Date().getTime();
			const timeToWait = Math.max(0, 1500 - (timeEnd - timeStart));

			await Promises.sleep(timeToWait);

			onFinish();
		};

		start();
	}, []);

	return (
		<S.Splash>
			<S.Logo useAnimate={animateTitle} />
			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
