import { gql } from "@apollo/client";

export type AuthorsData = {
	authors: {
		id: string;
		name: string;
		reviews: { id: string; rating: number }[];
	}[];
};

export const GET_AUTHORS = gql`
	query GetAuthors {
		authors {
			id
			name
			reviews {
				id
				rating
			}
		}
	}
`;
