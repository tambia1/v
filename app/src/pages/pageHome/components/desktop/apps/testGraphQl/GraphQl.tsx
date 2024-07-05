import * as S from "./GraphQl.styles";
import { GraphQlApolloClient } from "./components/graphQlApolloClient/GraphQlApolloClient";

export const TestGraphQl = () => {
	return (
		<S.TestGraphQl>
			<S.Container>
				<GraphQlApolloClient />
			</S.Container>
		</S.TestGraphQl>
	);
};
