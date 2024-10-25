import { useQuery } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { GET_REVIEWS, type IReviews } from "../../graphql/reviews.query";
import * as S from "./Reviews.styles";

export const Reviews = () => {
	const { loading, error, data, refetch } = useQuery<IReviews>(GET_REVIEWS);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Reviews>
			<Text>Reviews:</Text>
			{loading && <Text variant="header">Loading...</Text>}
			{error && <Text variant="header">Error: {error.message}</Text>}
			{data?.reviews && (
				<S.Table>
					{data.reviews.map((review) => (
						<S.Row key={review.id}>
							<Text color="accentFg">id: </Text>
							<Text color="primaryFg">{review.id}</Text>
							<S.Space />
							<Text color="accentFg">rating: </Text>
							<Text color="primaryFg">{review.rating}</Text>
							<S.Space />
							<Text color="accentFg">content: </Text>
							<Text color="primaryFg">{review.content}</Text>
							<S.Space />
							<Text color="accentFg">game: </Text>
							<Text color="primaryFg">{review.game.title}</Text>
							<S.Space />
							<Text color="accentFg">author: </Text>
							<Text color="primaryFg">{review.author.name}</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Reviews>
	);
};
