import { useQuery } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { type AuthorsData, GET_AUTHORS } from "../../graphql/authors.query";
import * as S from "./Authors.styles";

export const Authors = () => {
	const { loading, error, data, refetch } = useQuery<AuthorsData>(GET_AUTHORS);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Authors>
			<Text>Authors:</Text>
			{loading && <Text variant="header">Loading...</Text>}
			{error && <Text variant="header">Error: {error.message}</Text>}
			{data?.authors && (
				<S.Table>
					{data.authors.map((author) => (
						<S.Row key={author.id}>
							<Text color="accentFg">id: </Text>
							<Text color="primaryFg">{author.id}</Text>
							<S.Space />
							<Text color="accentFg">title: </Text>
							<Text color="primaryFg">{author.name}</Text>
							<S.Space />
							<Text color="accentFg">reviews: </Text>
							<Text color="primaryFg">[{author.reviews.map((review) => review.id).toString()}]</Text>
							<S.Space />
							<Text color="accentFg">ratings: </Text>
							<Text color="primaryFg">[{author.reviews.map((review) => review.rating).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Authors>
	);
};
