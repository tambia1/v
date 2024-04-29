import { Text } from "@src/components/text/Text";
import * as S from "./GameDelete.styles";
import { useMutation } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { DELETE_GAME } from "../../graphql/queires/gameDelete.query";
import { GET_GAMES } from "../../graphql/queires/games.query";

export const GameDelete = () => {
	const [deleteGame] = useMutation(DELETE_GAME);

	const handleDeleteGame = async () => {
		try {
			await deleteGame({ variables: { id: "1" }, refetchQueries: [{ query: GET_GAMES }] });
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<S.GameDelete>
			<Text>Game Delete:</Text>
			<Button onClick={handleDeleteGame}>Delete Game</Button>
		</S.GameDelete>
	);
};
