import { useQuery } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { GET_GAMES, type GamesData } from "../../graphql/games.query";
import * as S from "./Games.styles";

export const Games = () => {
	const { loading, error, data, refetch } = useQuery<GamesData>(GET_GAMES);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Games>
			<Text>Games:</Text>
			{loading && <Text variant="header">Loading...</Text>}
			{error && <Text variant="header">Error: {error.message}</Text>}
			{data?.games && (
				<S.Table>
					{data.games.map((game) => (
						<S.Row key={game.id}>
							<Text color="secondaryFgEnabled">id: </Text>
							<Text color="primaryFgEnabled">{game.id}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">title: </Text>
							<Text color="primaryFgEnabled">{game.title}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">reviews: </Text>
							<Text color="primaryFgEnabled">[{game.reviews.map((review) => review.id).toString()}]</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">ratings: </Text>
							<Text color="primaryFgEnabled">[{game.reviews.map((review) => review.rating).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Games>
	);
};
