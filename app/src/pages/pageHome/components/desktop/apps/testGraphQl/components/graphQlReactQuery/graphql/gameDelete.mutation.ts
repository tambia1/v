import { gql } from "@apollo/client";

export const DELETE_GAME = gql`
	mutation DeleteGame($id: ID!) {
		deleteGame(id: $id) {
			id
		}
	}
`;
