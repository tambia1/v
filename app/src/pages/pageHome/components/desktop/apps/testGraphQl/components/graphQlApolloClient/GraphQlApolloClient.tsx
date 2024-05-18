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
		<ApolloProvider client={client}>
			<S.GraphQlApolloClient>
				<Text size="l">GraphQL ApolloClient</Text>

				<Games />
				<Authors />
				<Reviews />
				<Game />
				<GameAdd />
				<GameDelete />
			</S.GraphQlApolloClient>
		</ApolloProvider>
	);
};
