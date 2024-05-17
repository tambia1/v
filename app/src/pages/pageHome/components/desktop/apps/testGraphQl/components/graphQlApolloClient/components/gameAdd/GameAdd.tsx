import { Text } from "@src/components/text/Text";
import * as S from "./GameAdd.styles";
import { useMutation } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { ADD_GAME } from "../../graphql/gameAdd.mutation";
import { GET_GAMES } from "../../graphql/games.query";

export const GameAdd = () => {
	const [addGame] = useMutation(ADD_GAME);

	const handleAddGame = async () => {
		await addGame({ variables: { game: { title: "Clash Royale", platforms: ["PC"] } }, refetchQueries: [{ query: GET_GAMES }] });
	};

	return (
		<S.GameAdd>
			<Text>Game Add:</Text>
			<Button onClick={handleAddGame}>Add Game</Button>
		</S.GameAdd>
	);
};
