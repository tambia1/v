import * as S from "./GraphQl.styles";
import { GraphQlApolloClient } from "./components/graphQlApolloClient/GraphQlApolloClient";
import { GraphQlReactQuery } from "./components/graphQlReactQuery/GraphQlReactQuery";

export const TestGraphQl = () => {
	return (
		<S.TestGraphQl>
			<S.Container>
				<GraphQlApolloClient />
				<GraphQlReactQuery />
			</S.Container>
		</S.TestGraphQl>
	);
};
