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

	const handleOnClickGoole = async () => {
		navigateToDataCenter();
	};

	const handleOnClickGitHub = async () => {
		navigateToDataCenter();
	};

	const handleOnClickSso = async () => {
		navigateToDataCenter();
	};

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
							<S.BoxLeft id={"login-left"}>
								<S.Icon id={"login-icon"} />
								<h3 id={"login-title"}>redis</h3>
							</S.BoxLeft>
							<S.BoxRight id={"login-right"}>
								<S.Title>sign in with</S.Title>
								<Button onClick={handleOnClickGoole}>Google</Button>
								<Button onClick={handleOnClickGitHub}>GitHub</Button>
								<Button onClick={handleOnClickSso}>SSO</Button>
								<S.Title>Sign in with email</S.Title>
								<S.Text>Email:</S.Text>
								<input name="email" type="text" className="" placeholder="Email" autoComplete="off" value="" onChange={() => {}} />
								<S.Text>Password:</S.Text>
								<input name="password" type="password" className="" placeholder="Password" autoComplete="off" value="" onChange={() => {}} />
								<S.Spacer />
								<Button onClick={handleOnClickLogin}>Login</Button>
							</S.BoxRight>
						</S.Box>
					</Animate>
				</S.Container>
				<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
			</ScreenContainer>
		</PageContainer>
	);
};
