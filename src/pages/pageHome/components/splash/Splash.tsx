import { useEffect } from "react";
import * as S from "./Splash.styles";
import { lang } from "@src/locales/i18n";
import { version } from "@src/../package.json";
import { T } from "@src/locales/T";
import { useAnimate } from "@src/components/animate/UseAnimate";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const animateTitle = useAnimate("hide");

	useEffect(() => {
		const start = async () => {
			await animateTitle.current.play("appear");

			// await Promise.all([
			// 	Files.downloadImages(Object.values(Icons)),
			// 	Files.downloadImages(backgroundImages.map((item) => item.light)),
			// 	Files.downloadImages(backgroundImages.map((item) => item.dark)),
			// ]);

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

			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
