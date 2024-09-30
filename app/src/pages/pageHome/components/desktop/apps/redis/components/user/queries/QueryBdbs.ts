import { bdbs as fakeResponse } from "./../../../data/bdbs";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Bdb, QueryResult } from "./Query.types";

type Props = {
	csrf: string;
};

type Result = QueryResult<{
	bdbs: Bdb[];
}>;

const get = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch(`https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/bdbs?productType=unifiedrc`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-csrf-token": props.csrf,
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

const bdbs = (props: Props, options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["bdbs"],
		queryFn: () => get(props),
		...options,
	});
};

export const QueryBdbs = {
	bdbs,
};
