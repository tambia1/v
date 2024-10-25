import { useQuery } from "@apollo/client";
import { Text } from "@src/components/text/Text";
import { GET_GAME, type IGame } from "../../graphql/game.query";
import * as S from "./Game.styles";

export const Game = () => {
	const { loading, error, data } = useQuery<IGame>(GET_GAME, {
		variables: { id: "1" },
	});

	return (
		<S.Game>
			<Text>Game:</Text>
			{loading && <Text variant="header">Loading...</Text>}
			{error && <Text variant="header">Error: {error.message}</Text>}
			{data?.game && (
				<S.Row>
					<Text color="accentFg">id: </Text>
					<Text color="primaryFg">{data.game.id}</Text>
					<S.Space />
					<Text color="accentFg">title: </Text>
					<Text color="primaryFg">{data.game.title}</Text>
					<S.Space />
					<Text color="accentFg">platforms: </Text>
					<Text color="primaryFg">{data.game.platforms}</Text>
				</S.Row>
			)}
		</S.Game>
	);
};
