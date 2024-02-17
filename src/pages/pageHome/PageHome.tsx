import * as S from "./PageHome.styles";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Splash } from "./components/splash/Splash";
import { Desktop } from "./components/desktop/Desktop";

export const PageHome = () => {
	const animateSplash = useAnimate("appear");
	const animateHome = useAnimate("hide");

	const handleSplashOnFinish = async () => {
		await animateHome.current.play("show");
		await animateSplash.current.play("disappear");
	};

	return (
		<S.PageHome>
			<S.Desktop>
				<Animate useAnimate={animateHome}>
					<Desktop />
				</Animate>
			</S.Desktop>
			<S.Splash>
				<Animate useAnimate={animateSplash}>
					<Splash onFinish={handleSplashOnFinish} />
				</Animate>
			</S.Splash>
		</S.PageHome>
	);
};
