import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";

type Result = QueryResult<{
	csrfToken: {
		csrf_token: string;
		csrf_enabled: boolean;
		errors: string[];
	};
}>;

const get = async (): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/csrf", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const res = await response.json();

		if (response.ok) {
			result = {
				error: 0,
				message: "",
				response: res,
			};
		} else {
			result = {
				error: 2,
				message: "error",
			};
		}
	} catch (error) {
		result = {
			error: 1,
			message: "error",
		};
	}

	return result;
};

const csrf = (options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["csrf"],
		queryFn: () => get(),
		...options,
	});
};

export const QueryCsrf = {
	csrf,
};