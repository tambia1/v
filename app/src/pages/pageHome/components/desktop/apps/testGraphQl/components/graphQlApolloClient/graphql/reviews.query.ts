import { gql } from "@apollo/client";

export type ReviewsData = {
	reviews: {
		id: string;
		rating: string;
		content: string;
		game: { id: string; title: string };
		author: { id: string; name: string };
	}[];
};

export const GET_REVIEWS = gql`
	query GetReviews {
		reviews {
			id
			rating
			content
			game {
				id
				title
			}
			author {
				id
				name
			}
		}
	}
`;
