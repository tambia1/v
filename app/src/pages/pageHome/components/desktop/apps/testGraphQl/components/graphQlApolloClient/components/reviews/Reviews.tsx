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
							<Text color="secondaryFgEnabled">id: </Text>
							<Text color="primaryFgEnabled">{review.id}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">rating: </Text>
							<Text color="primaryFgEnabled">{review.rating}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">content: </Text>
							<Text color="primaryFgEnabled">{review.content}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">game: </Text>
							<Text color="primaryFgEnabled">{review.game.title}</Text>
							<S.Space />
							<Text color="secondaryFgEnabled">author: </Text>
							<Text color="primaryFgEnabled">{review.author.name}</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Reviews>
	);
};
