import { gql } from "graphql-tag";

export type IAuthors = {
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
