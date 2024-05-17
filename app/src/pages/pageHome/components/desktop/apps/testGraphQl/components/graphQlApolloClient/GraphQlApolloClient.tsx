import { Text } from "@src/components/text/Text";
import * as S from "./GraphQlApolloClient.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";
import { Reviews } from "./components/reviews/Reviews";
import { Game } from "./components/game/Game";
import { GameDelete } from "./components/gameDelete/GameDelete";
import { GameAdd } from "./components/gameAdd/GameAdd";

const client = new ApolloClient({
	uri: "http://localhost:5003/",
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

				<S.Space />
				<GameAdd />

				<S.Space />
				<GameDelete />
			</ApolloProvider>
		</S.GraphQlApolloClient>
	);
};
