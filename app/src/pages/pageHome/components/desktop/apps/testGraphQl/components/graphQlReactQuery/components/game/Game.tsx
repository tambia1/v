import { Text } from "@src/components/text/Text";
import * as S from "./Game.styles";
import { GET_GAME, IGame } from "../../graphql/queires/game.query";
import { useGraphQlQuery } from "../../graphql/graphQlQuery";

export const Game = () => {
	const { isLoading, error, data } = useGraphQlQuery<IGame>("game", GET_GAME, { id: "1" });

	return (
		<S.Game>
			<Text>Game:</Text>
			{isLoading && <Text size="l">Loading...</Text>}
			{error && <Text size="l">Error: {error.message}</Text>}
			{data?.game && (
				<S.Row>
					<Text color="accentFg">id: </Text>
					<Text color="normalFg">{data.game.id}</Text>
					<S.Space />
					<Text color="accentFg">title: </Text>
					<Text color="normalFg">{data.game.title}</Text>
				</S.Row>
			)}
		</S.Game>
	);
};
