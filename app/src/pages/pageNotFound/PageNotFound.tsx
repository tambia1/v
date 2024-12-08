import { Pages } from "@pages/Pages.types";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { useNavigate } from "react-router-dom";
import * as S from "./PageNotFound.styles";

export const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<S.Container>
			<S.Box>
				<Text variant="title">Page Not Found</Text>
				<Button onClick={() => navigate(Pages.home)}>Home</Button>
			</S.Box>
		</S.Container>
	);
};
