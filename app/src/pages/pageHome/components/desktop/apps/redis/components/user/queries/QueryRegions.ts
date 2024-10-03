import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { regions as fakeResponse } from "../../../data/regions";
import type { QueryResult, Region } from "./Query.types";

type Props = {
	csrf: string;
};

type Result = QueryResult<Region[]>;

const get = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/plans/cloud_regions?type=all", {
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

const regions = (props: Props, options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["regions"],
		queryFn: () => get(props),
		...options,
	});
};

export const QueryRegions = {
	regions,
};
