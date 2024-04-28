import { useQuery } from "@tanstack/react-query";
import { DocumentNode } from "graphql";
import request, { Variables } from "graphql-request";

export const useGraphQlQuery = <T,>(key: string, query: DocumentNode, variables?: Variables) => {
	const url = "http://localhost:4000/";

	return useQuery({
		queryKey: [key],
		queryFn: async () => await request<T>(url, query, variables),
	});
};
