import { Text } from "@src/components/text/Text";
import * as S from "./GraphQlApolloClient.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";
import { Reviews } from "./components/reviews/Reviews";
import { Game } from "./components/game/Game";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
		addTypename: false,
	}),
});

export const GraphQlApolloClient = () => {
	return (
		<S.GraphQlApolloClient>
			<ApolloProvider client={client}>
				<Text size="l">GraphQL ApolloClient</Text>

				<S.Space />
				<Games />

				<S.Space />
				<Authors />

				<S.Space />
				<Reviews />

				<S.Space />
				<Game />
			</ApolloProvider>
		</S.GraphQlApolloClient>
	);
};
