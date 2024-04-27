import { Text } from "@src/components/text/Text";
import * as S from "./Reviews.styles";
import { gql, useQuery } from "@apollo/client";

const GET_REVIEWS = gql`
	query GetReviews {
		reviews {
			id
			rating
			content
			game {
				id
				title
			}
			author {
				id
				name
			}
		}
	}
`;

export const Reviews = () => {
	const { loading, error, data } = useQuery<{ reviews: { id: string; rating: string; content: string; game: { id: string; title: string }; author: { id: string; name: string } }[] }>(GET_REVIEWS);

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
		</S.Reviews>
	);
};
