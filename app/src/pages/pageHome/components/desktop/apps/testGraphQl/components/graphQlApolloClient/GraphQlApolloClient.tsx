import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Text } from "@src/components/text/Text";
import * as S from "./GraphQlApolloClient.styles";
import { Authors } from "./components/authors/Authors";
import { Game } from "./components/game/Game";
import { GameAdd } from "./components/gameAdd/GameAdd";
import { GameDelete } from "./components/gameDelete/GameDelete";
import { Games } from "./components/games/Games";
import { Reviews } from "./components/reviews/Reviews";

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
				<Text fontSize="header">GraphQL ApolloClient</Text>

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
