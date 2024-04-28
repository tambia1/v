import { Text } from "@src/components/text/Text";
import * as S from "./Games.styles";
import { GET_GAMES, IGames } from "../../graphql/queires/games.query";
import { useGraphQlQuery } from "../../graphql/graphQlQuery";

export const Games = () => {
	const { isLoading, error, data } = useGraphQlQuery<IGames>("games", GET_GAMES);

	return (
		<S.Games>
			<Text>Games:</Text>
			{isLoading && <Text size="l">Loading...</Text>}
			{error && <Text size="l">Error: {error.message}</Text>}
			{data?.games && (
				<S.Table>
					{data.games.map((game) => (
						<S.Row key={game.id}>
							<Text color="accentFg">id: </Text>
							<Text color="normalFg">{game.id}</Text>
							<S.Space />
							<Text color="accentFg">title: </Text>
							<Text color="normalFg">{game.title}</Text>
							<S.Space />
							<Text color="accentFg">reviews: </Text>
							<Text color="normalFg">[{game.reviews.map((review) => review.id).toString()}]</Text>
							<S.Space />
							<Text color="accentFg">ratings: </Text>
							<Text color="normalFg">[{game.reviews.map((review) => review.rating).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
		</S.Games>
	);
};
