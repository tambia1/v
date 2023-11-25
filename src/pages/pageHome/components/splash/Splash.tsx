import { useEffect } from "react";
import * as S from "./Splash.styles";
import { lang } from "@src/locales/i18n";
import { version } from "@src/../package.json";
import { T } from "@src/locales/T";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Files } from "@src/services/Files";
import { Icons } from "@src/icons/Icon.types";
import { Promises } from "@src/services/Promises";

interface Props {
	onFinish: () => void;
}

export const Splash = ({ onFinish }: Props) => {
	const animateTitle = useAnimate("hide");

	useEffect(() => {
		const start = async () => {
			console.time("downloadImages");
			await Files.downloadImages(Object.values(Icons));
			console.timeEnd("downloadImages");
			await Promises.sleep(500);
			await animateTitle.current.play("appear");
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

			<S.Version>{version}</S.Version>
		</S.Splash>
	);
};
