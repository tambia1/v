import { Text } from "@src/components/text/Text";
import * as S from "./GameDelete.styles";
import { Button } from "@src/components/button/Button";
import { useGraphQlMutation } from "../../graphql/helpers/graphQlMutation";
import { DELETE_GAME } from "../../graphql/gameDelete.mutation";
import { useGraphQlQuery } from "../../graphql/helpers/graphQlQuery";
import { GET_GAMES, IGames } from "../../graphql/games.query";
import { useState } from "react";
import { Input } from "@src/components/input/Input";

export const GameDelete = () => {
	const [id, setId] = useState("1");

	const mutation = useGraphQlMutation(DELETE_GAME);
	const { refetch } = useGraphQlQuery<IGames>("games", GET_GAMES);

	const handleDeleteGame = async () => {
		await mutation({ id: id });
		refetch();
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
