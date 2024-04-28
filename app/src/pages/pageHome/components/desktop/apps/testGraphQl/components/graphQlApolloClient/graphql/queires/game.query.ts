import { gql } from "@apollo/client";

export type IGame = {
	game: {
		id: string;
		title: string;
	};
};

export const GET_GAME = gql`
	query GetGame($id: ID!) {
		game(id: $id) {
			id
			title
		}
	}
`;
