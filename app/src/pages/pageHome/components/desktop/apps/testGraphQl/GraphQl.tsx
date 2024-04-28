import { Text } from "@src/components/text/Text";
import * as S from "./GraphQl.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";
import { Reviews } from "./components/reviews/Reviews";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
		addTypename: false,
	}),
});

export const GraphQl = () => {
	return (
		<S.GraphQl>
			<ApolloProvider client={client}>
				<Text size="l">GraphQL</Text>

				<S.Space />
				<Games />

				<S.Space />
				<Authors />

				<S.Space />
				<Reviews />
			</ApolloProvider>
		</S.GraphQl>
	);
};
