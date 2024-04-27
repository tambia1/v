import { Text } from "@src/components/text/Text";
import * as S from "./Games.styles";
import { gql, useQuery } from "@apollo/client";

const GET_GAMES = gql`
	query GetGames {
		games {
			id
			title
			reviews {
				id
				rating
			}
		}
	}
`;

export const Games = () => {
	const { loading, error, data } = useQuery<{ games: { id: string; title: string; reviews: { id: string; rating: number }[] }[] }>(GET_GAMES);

	return (
		<S.Games>
			<Text>Games:</Text>
			{loading && <Text size="l">Loading...</Text>}
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
