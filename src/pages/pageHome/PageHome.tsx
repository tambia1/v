import * as S from "./PageHome.styles";
import { Splash } from "./components/splash/Splash";
import { Desktop } from "./components/desktop/Desktop";
import { useLayoutEffect, useRef, useState } from "react";
import { useAnimation } from "@src/hooks/UseAnimation";

export const PageHome = () => {
	const refSplash = useRef(null);
	const refDesktop = useRef(null);
	const animationSplash = useAnimation(refSplash);
	const animationDesktop = useAnimation(refDesktop);

	const [showSlash, setShowSplash] = useState(true);

	useLayoutEffect(() => {
		const run = async () => {
			await animationDesktop.play("hide");
			await animationSplash.play("appear");
		};

		run();
	}, []);

	const handleSplashOnFinish = async () => {
		await animationDesktop.play("show");
		await animationSplash.play("disappear");

		setShowSplash(false);
	};

	return (
		<S.PageHome>
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
