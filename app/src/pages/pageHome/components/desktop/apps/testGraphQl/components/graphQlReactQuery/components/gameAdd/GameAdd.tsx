import { Text } from "@src/components/text/Text";
import * as S from "./GameAdd.styles";
import { Button } from "@src/components/button/Button";
import { ADD_GAME } from "../../graphql/gameAdd.mutation";
import { GET_GAMES, IGames } from "../../graphql/games.query";
import { useGraphQlMutation } from "../../graphql/helpers/graphQlMutation";
import { useGraphQlQuery } from "../../graphql/helpers/graphQlQuery";

export const GameAdd = () => {
	const mutation = useGraphQlMutation(ADD_GAME);

	const { refetch } = useGraphQlQuery<IGames>("games", GET_GAMES);

	const handleAddGame = async () => {
		await mutation({ game: { title: "Clash Royale", platforms: ["PC"] } });
		refetch();
	};

	return (
		<S.GameAdd>
			<Text>Game Add:</Text>
			<Button onClick={handleAddGame}>Add Game</Button>
		</S.GameAdd>
	);
};
