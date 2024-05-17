import { Text } from "@src/components/text/Text";
import * as S from "./GameDelete.styles";
import { useMutation } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { DELETE_GAME } from "../../graphql/gameDelete.mutation";
import { GET_GAMES } from "../../graphql/games.query";
import { Input } from "@src/components/input/Input";
import { useState } from "react";

export const GameDelete = () => {
	const [id, setId] = useState("1");

	const [deleteGame] = useMutation(DELETE_GAME);
	const handleDeleteGame = async () => {
		await deleteGame({ variables: { id: id }, refetchQueries: [{ query: GET_GAMES }] });
	};

	return (
		<S.GameDelete>
			<Text>Game Delete:</Text>
			<S.Row>
				<Input
					value={id}
					onTextChange={(value: string) => {
						setId(value);
					}}
				/>
				<Button onClick={handleDeleteGame}>Delete Game</Button>
			</S.Row>
		</S.GameDelete>
	);
};
