import { Text } from "@src/components/text/Text";
import * as S from "./GameDelete.styles";
import { useMutation } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { DELETE_GAME } from "../../graphql/gameDelete.mutation";
import { GET_GAMES } from "../../graphql/games.query";

export const GameDelete = () => {
	const [deleteGame] = useMutation(DELETE_GAME);

	const handleDeleteGame = async () => {
		await deleteGame({ variables: { id: "1" }, refetchQueries: [{ query: GET_GAMES }] });
	};

	return (
		<S.GameDelete>
			<Text>Game Delete:</Text>
			<Button onClick={handleDeleteGame}>Delete Game</Button>
		</S.GameDelete>
	);
};
