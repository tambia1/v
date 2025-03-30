import { useQuery } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { GET_REVIEWS, type ReviewsData } from "../../graphql/reviews.query";
import * as S from "./Reviews.styles";

export const Reviews = () => {
	const { loading, error, data, refetch } = useQuery<ReviewsData>(GET_REVIEWS);

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
							<Text color="secondary900">id: </Text>
							<Text color="primary800">{review.id}</Text>
							<S.Space />
							<Text color="secondary900">rating: </Text>
							<Text color="primary800">{review.rating}</Text>
							<S.Space />
							<Text color="secondary900">content: </Text>
							<Text color="primary800">{review.content}</Text>
							<S.Space />
							<Text color="secondary900">game: </Text>
							<Text color="primary800">{review.game.title}</Text>
							<S.Space />
							<Text color="secondary900">author: </Text>
							<Text color="primary800">{review.author.name}</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Reviews>
	);
};
