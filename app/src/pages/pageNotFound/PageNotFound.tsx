import { Pages } from "@pages/Pages.types";
import { Button } from "@src/components/button/Button";
import { useNavigate } from "react-router-dom";
import * as S from "./pageNotFound1.styles";

export const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<S.Container>
			<S.Box>
				<S.Title>Page Not Found</S.Title>
				<Button onClick={() => navigate(Pages.home)}>Home</Button>
			</S.Box>
		</S.Container>
	);
};
