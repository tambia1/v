import { Pages } from "@pages/Pages.types";
import { Button } from "@src/components/button/Button";
import { useNavigate } from "react-router-dom";
import { PageContainer, ScreenContainer } from "../pageHome/PageHome.styles";
import * as S from "./pageNotFound.styles";

export const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<PageContainer>
			<ScreenContainer>
				<S.Container>
					<S.Box>
						<S.Title>Page Not Found</S.Title>
						<Button onClick={() => navigate(Pages.login)}>Login</Button>
					</S.Box>
				</S.Container>
			</ScreenContainer>
		</PageContainer>
	);
};
