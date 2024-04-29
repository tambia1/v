import { Text } from "@src/components/text/Text";
import * as S from "./Games.styles";
import { GET_GAMES, IGames } from "../../graphql/queires/games.query";
import { useGraphQlQuery } from "../../graphql/graphQlQuery";
import { Button } from "@src/components/button/Button";

export const Games = () => {
	const { isLoading, error, data, refetch } = useGraphQlQuery<IGames>("games", GET_GAMES);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

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
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Games>
	);
};
