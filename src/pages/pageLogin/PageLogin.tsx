import { version } from "@src/../package.json";
import { Animate } from "@src/components/animate/Animate";
import { useAnimate } from "@src/components/animate/UseAnimate";
import { Button } from "@src/components/button/Button";
import { content } from "@src/locale/en";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../Pages.types";
import { PageContainer, ScreenContainer } from "../pageHome/PageHome.styles";
import * as S from "./PageLogin.styles";

export const PageLogin = () => {
	const navigate = useNavigate();
	const animate = useAnimate();

	useEffect(() => {
		animate.current.play("show");
	}, []);

	const handleOnClickLogin = () => {
		navigateToDataCenter();
	};

	const navigateToDataCenter = async () => {
		await animate.current.play("hide");
		navigate(Pages.home.dataCenter);
	};

	return (
		<PageContainer>
			<ScreenContainer>
				<S.Container>
					<Animate useAnimate={animate}>
						<S.Box id={"login-box"}>
							<S.Title>Hello</S.Title>
							<S.Spacer />
							<Button onClick={handleOnClickLogin}>Login</Button>
						</S.Box>
					</Animate>
				</S.Container>
				<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
			</ScreenContainer>
		</PageContainer>
	);
};
