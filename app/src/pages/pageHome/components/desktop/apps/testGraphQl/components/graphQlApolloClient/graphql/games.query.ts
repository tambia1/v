import { gql } from "@apollo/client";

export type GamesData = {
	games: {
		id: string;
		title: string;
		reviews: { id: string; rating: number }[];
	}[];
};

export const GET_GAMES = gql`
	query GetGames {
		games {
			id
			title
			reviews {
				id
				rating
			}
		}
	}
`;
