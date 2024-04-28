import { Text } from "@src/components/text/Text";
import * as S from "./GraphQlReactQuery.styles";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";
import { Reviews } from "./components/reviews/Reviews";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export const GraphQlReactQuery = () => {
	return (
		<S.GraphQlReactQuery>
			<QueryClientProvider client={client}>
				<Text size="l">GraphQL ReactQuery</Text>

				<S.Space />
				<Games />

				<S.Space />
				<Authors />

				<S.Space />
				<Reviews />
			</QueryClientProvider>
		</S.GraphQlReactQuery>
	);
};
