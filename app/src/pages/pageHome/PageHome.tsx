import { version } from "@src/../package.json";
import { useAnimation } from "@src/hooks/UseAnimation";
import { useLayoutEffect, useRef, useState } from "react";
import { Desktop } from "./components/desktop/Desktop";
import { Splash } from "./components/splash/Splash";
import * as S from "./PageHome.styles";

export const PageHome = () => {
	const refSplash = useRef(null);
	const refDesktop = useRef(null);
	const animationSplash = useAnimation(refSplash);
	const animationDesktop = useAnimation(refDesktop);

	const [showSlash, setShowSplash] = useState(true);

	useLayoutEffect(() => {
		const run = async () => {
			animationDesktop.play("hide");
			animationSplash.play("show");
		};

		run();
	}, [animationDesktop.play, animationSplash.play]);

	const handleSplashOnFinish = async () => {
		await animationDesktop.play("show");
		await animationSplash.play("disappear");

		setShowSplash(false);
	};

	return (
		<S.PageHome data-app-version={`${version}`}>
			<S.Desktop ref={refDesktop}>
				<Desktop />
			</S.Desktop>
			{showSlash && (
				<S.Splash ref={refSplash}>
					<Splash onFinish={handleSplashOnFinish} />
				</S.Splash>
			)}
		</S.PageHome>
	);
};
