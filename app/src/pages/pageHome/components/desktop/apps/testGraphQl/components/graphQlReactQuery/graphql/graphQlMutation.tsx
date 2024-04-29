import { useMutation } from "@tanstack/react-query";
import { DocumentNode } from "graphql";
import { request, Variables } from "graphql-request";

export const useGraphQlMutation = <T,>(query: DocumentNode) => {
	const url = "http://localhost:4000/";

	const { mutateAsync } = useMutation({
		mutationFn: async (variables?: Variables) => {
			const response = await request<T>(url, query, variables);

			return response;
		},
	});

	return mutateAsync;
};
