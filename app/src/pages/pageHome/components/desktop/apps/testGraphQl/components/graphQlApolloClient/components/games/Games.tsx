import { useQuery } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { GET_GAMES, type IGames } from "../../graphql/games.query";
import * as S from "./Games.styles";

export const Games = () => {
	const { loading, error, data, refetch } = useQuery<IGames>(GET_GAMES);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Games>
			<Text>Games:</Text>
			{loading && <Text fontSize="header">Loading...</Text>}
			{error && <Text fontSize="header">Error: {error.message}</Text>}
			{data?.games && (
				<S.Table>
					{data.games.map((game) => (
						<S.Row key={game.id}>
							<Text color="accentFg">id: </Text>
							<Text color="primaryFg">{game.id}</Text>
							<S.Space />
							<Text color="accentFg">title: </Text>
							<Text color="primaryFg">{game.title}</Text>
							<S.Space />
							<Text color="accentFg">reviews: </Text>
							<Text color="primaryFg">[{game.reviews.map((review) => review.id).toString()}]</Text>
							<S.Space />
							<Text color="accentFg">ratings: </Text>
							<Text color="primaryFg">[{game.reviews.map((review) => review.rating).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Games>
	);
};
