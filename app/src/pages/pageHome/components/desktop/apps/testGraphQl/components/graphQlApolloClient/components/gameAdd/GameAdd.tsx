import { Text } from "@src/components/text/Text";
import * as S from "./GameAdd.styles";
import { useMutation } from "@apollo/client";
import { Button } from "@src/components/button/Button";
import { ADD_GAME } from "../../graphql/gameAdd.mutation";
import { GET_GAMES } from "../../graphql/games.query";
import { Input } from "@src/components/input/Input";
import { useState } from "react";

export const GameAdd = () => {
	const [title, setTitle] = useState("Pac Man");

	const [addGame] = useMutation(ADD_GAME);
	const handleAddGame = async () => {
		await addGame({ variables: { game: { title: title, platforms: ["PC"] } }, refetchQueries: [{ query: GET_GAMES }] });
	};

	return (
		<S.GameAdd>
			<Text>Game Add:</Text>
			<S.Row>
				<Input
					value={title}
					onTextChange={(value: string) => {
						setTitle(value);
					}}
				/>
				<Button onClick={handleAddGame}>Add Game</Button>
			</S.Row>
		</S.GameAdd>
	);
};
