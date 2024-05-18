import { Text } from "@src/components/text/Text";
import * as S from "./GraphQlReactQuery.styles";
import { Games } from "./components/games/Games";
import { Authors } from "./components/authors/Authors";
import { Reviews } from "./components/reviews/Reviews";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Game } from "./components/game/Game";
import { GameDelete } from "./components/gameDelete/GameDelete";
import { GameAdd } from "./components/gameAdd/GameAdd";

const client = new QueryClient();

export const GraphQlReactQuery = () => {
	return (
		<QueryClientProvider client={client}>
			<S.GraphQlReactQuery>
				<Text size="l">GraphQL ReactQuery</Text>

				<Games />
				<Authors />
				<Reviews />
				<Game />
				<GameAdd />
				<GameDelete />
			</S.GraphQlReactQuery>
		</QueryClientProvider>
	);
};
