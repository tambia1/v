import * as S from "./PageHome.styles";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Splash } from "./components/splash/Splash";
import { Home } from "./components/home/Home";

export const PageHome = () => {
	const animateSplash = useAnimate("appear");
	const animateHome = useAnimate("hide");

	const handleSplashOnFinish = async () => {
		await animateHome.current.play("show");
		await animateSplash.current.play("disappear");
	};

	return (
		<S.PageHome>
			<Animate useAnimate={animateHome}>
				<Home />
			</Animate>
			<Animate useAnimate={animateSplash}>
				<Splash onFinish={handleSplashOnFinish} />
			</Animate>
		</S.PageHome>
	);
};
