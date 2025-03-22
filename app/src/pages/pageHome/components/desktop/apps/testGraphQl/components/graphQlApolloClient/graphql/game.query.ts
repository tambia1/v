import { gql } from "@apollo/client";

export type GameData = {
	game: {
		id: string;
		title: string;
		platforms?: string[];
	};
};

export const GET_GAME = gql`
	query GetGame($id: ID!) {
		game(id: $id) {
			id
			title
			platforms
		}
	}
`;
