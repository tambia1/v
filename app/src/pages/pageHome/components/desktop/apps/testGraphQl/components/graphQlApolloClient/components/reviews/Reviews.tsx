import { Text } from "@src/components/text/Text";
import * as S from "./Reviews.styles";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS, IReviews } from "../../graphql/queires/reviews.query";
import { Button } from "@src/components/button/Button";

export const Reviews = () => {
	const { loading, error, data, refetch } = useQuery<IReviews>(GET_REVIEWS);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Reviews>
			<Text>Reviews:</Text>
			{loading && <Text size="l">Loading...</Text>}
			{error && <Text size="l">Error: {error.message}</Text>}
			{data?.reviews && (
				<S.Table>
					{data.reviews.map((review) => (
						<S.Row key={review.id}>
							<Text color="accentFg">id: </Text>
							<Text color="normalFg">{review.id}</Text>
							<S.Space />
							<Text color="accentFg">rating: </Text>
							<Text color="normalFg">{review.rating}</Text>
							<S.Space />
							<Text color="accentFg">content: </Text>
							<Text color="normalFg">{review.content}</Text>
							<S.Space />
							<Text color="accentFg">game: </Text>
							<Text color="normalFg">{review.game.title}</Text>
							<S.Space />
							<Text color="accentFg">author: </Text>
							<Text color="normalFg">{review.author.name}</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Reviews>
	);
};
