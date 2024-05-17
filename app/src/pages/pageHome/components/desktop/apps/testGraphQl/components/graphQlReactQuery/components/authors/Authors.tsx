import { Text } from "@src/components/text/Text";
import * as S from "./Authors.styles";
import { GET_AUTHORS, IAuthors } from "../../graphql/authors.query";
import { useGraphQlQuery } from "../../graphql/helpers/graphQlQuery";
import { Button } from "@src/components/button/Button";

export const Authors = () => {
	const { isLoading, error, data, refetch } = useGraphQlQuery<IAuthors>("authors", GET_AUTHORS);

	const hanldeOnClickRefetch = () => {
		refetch();
	};

	return (
		<S.Authors>
			<Text>Authors:</Text>
			{isLoading && <Text size="l">Loading...</Text>}
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
							<S.Space />
							<Text color="accentFg">ratings: </Text>
							<Text color="normalFg">[{author.reviews.map((review) => review.rating).toString()}]</Text>
						</S.Row>
					))}
				</S.Table>
			)}
			<Button onClick={hanldeOnClickRefetch}>Refetch</Button>
		</S.Authors>
	);
};
