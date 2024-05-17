import { Text } from "@src/components/text/Text";
import * as S from "./Game.styles";
import { useQuery } from "@apollo/client";
import { GET_GAME, IGame } from "../../graphql/game.query";

export const Game = () => {
	const { loading, error, data } = useQuery<IGame>(GET_GAME, {
		variables: { id: "1" },
	});

	return (
		<S.Game>
			<Text>Game:</Text>
			{loading && <Text size="l">Loading...</Text>}
			{error && <Text size="l">Error: {error.message}</Text>}
			{data?.game && (
				<S.Row>
					<Text color="accentFg">id: </Text>
					<Text color="normalFg">{data.game.id}</Text>
					<S.Space />
					<Text color="accentFg">title: </Text>
					<Text color="normalFg">{data.game.title}</Text>
					<S.Space />
					<Text color="accentFg">platforms: </Text>
					<Text color="normalFg">{data.game.platforms}</Text>
				</S.Row>
			)}
		</S.Game>
	);
};
