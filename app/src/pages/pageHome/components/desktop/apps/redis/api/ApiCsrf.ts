import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { csrf as fakeResponse } from "../data/csrf";
import type { QueryResult } from "./Api.types";

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

	if (result.error !== 0) {
		result = {
			error: 0,
			message: "fake",
			response: fakeResponse,
		};
	}

	return result;
};

const quryCsrf = (options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["csrf"],
		queryFn: () => get(),
		...options,
	});
};

export const Csrf = {
	quryCsrf,
};
