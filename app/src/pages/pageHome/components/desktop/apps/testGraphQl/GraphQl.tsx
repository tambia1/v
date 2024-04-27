import { Text } from "@src/components/text/Text";
import * as S from "./GraphQl.styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
		addTypename: false,
	}),
});

export const GraphQl = () => {
	return (
		<ApolloProvider client={client}>
			<S.GraphQl>
				<Text size="l">GraphQL</Text>

				<S.Space />
				<Games />

				<S.Space />
				<Authors />
			</S.GraphQl>
		</ApolloProvider>
	);
};
