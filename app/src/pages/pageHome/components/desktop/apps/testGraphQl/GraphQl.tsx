import * as S from "./GraphQl.styles";
import { GraphQlApolloClient } from "./components/graphQlApolloClient/GraphQlApolloClient";
import { GraphQlReactQuery } from "./components/graphQlReactQuery/GraphQlReactQuery";

export const GraphQl = () => {
	return (
		<S.GraphQl>
			<S.Container>
				<GraphQlApolloClient />
				<GraphQlReactQuery />
			</S.Container>
		</S.GraphQl>
	);
};
