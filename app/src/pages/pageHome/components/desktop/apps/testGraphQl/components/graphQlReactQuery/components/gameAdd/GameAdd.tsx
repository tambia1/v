import { Text } from "@src/components/text/Text";
import * as S from "./GameAdd.styles";
import { Button } from "@src/components/button/Button";
import { ADD_GAME } from "../../graphql/gameAdd.mutation";
import { GET_GAMES, IGames } from "../../graphql/games.query";
import { useGraphQlMutation } from "../../graphql/helpers/graphQlMutation";
import { useGraphQlQuery } from "../../graphql/helpers/graphQlQuery";
import { useState } from "react";
import { Input } from "@src/components/input/Input";

export const GameAdd = () => {
	const [title, setTitle] = useState("Pac Man");

	const mutation = useGraphQlMutation(ADD_GAME);
	const { refetch } = useGraphQlQuery<IGames>("games", GET_GAMES);

	const handleAddGame = async () => {
		await mutation({ game: { title: title, platforms: ["PC"] } });
		refetch();
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
