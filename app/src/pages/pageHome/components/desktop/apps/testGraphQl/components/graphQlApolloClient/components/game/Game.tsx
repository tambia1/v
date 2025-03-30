import { useQuery } from "@apollo/client";
import { Text } from "@src/components/text/Text";
import { GET_GAME, type GameData } from "../../graphql/game.query";
import * as S from "./Game.styles";

export const Game = () => {
	const { loading, error, data } = useQuery<GameData>(GET_GAME, {
		variables: { id: "1" },
	});

	return (
		<S.Game>
			<Text>Game:</Text>
			{loading && <Text variant="header">Loading...</Text>}
			{error && <Text variant="header">Error: {error.message}</Text>}
			{data?.game && (
				<S.Row>
					<Text color="secondary900">id: </Text>
					<Text color="primary800">{data.game.id}</Text>
					<S.Space />
					<Text color="secondary900">title: </Text>
					<Text color="primary800">{data.game.title}</Text>
					<S.Space />
					<Text color="secondary900">platforms: </Text>
					<Text color="primary800">{data.game.platforms}</Text>
				</S.Row>
			)}
		</S.Game>
	);
};
