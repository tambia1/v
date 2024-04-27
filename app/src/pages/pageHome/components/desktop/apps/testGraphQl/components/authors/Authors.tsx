import { Text } from "@src/components/text/Text";
import * as S from "./Authors.styles";
import { gql, useQuery } from "@apollo/client";

const GET_AUTHORS = gql`
	query GetAuthors {
		authors {
			id
			name
			reviews {
				id
			}
		}
	}
`;

export const Authors = () => {
	const { loading, error, data } = useQuery<{ authors: { id: string; name: string; reviews: { id: string }[] }[] }>(GET_AUTHORS);

	return (
		<S.Authors>
			<Text>Authors:</Text>
			{loading && <Text size="l">Loading...</Text>}
			{error && <Text size="l">Error: {error.message}</Text>}
			{data?.authors && (
				<S.Table>
					{data.authors.map((author) => (
						<S.Row key={author.id}>
							<Text color="accentFg">id: </Text>
							<Text color="normalFg">{author.id}</Text>
							<S.Space />
							<Text color="accentFg">title: </Text>
							<Text color="normalFg">{author.name}</Text>
							<S.Space />
							<Text color="accentFg">reviews: </Text>
							<Text color="normalFg">[{author.reviews.map((review) => review.id).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
		</S.Authors>
	);
};
