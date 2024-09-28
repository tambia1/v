import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Crdb, QueryResult } from "./Query.types";
import { crdbs as fakeCrdbs } from "./../../../data/crdbs";

type Props = {
	csrf: string;
};

type Result = QueryResult<{
	crdbs: Crdb[];
}>;

const get = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch(`https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/crdbs`, {
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
			// result = {
			// 	error: 2,
			// 	message: "error",
			// };

			result = {
				error: 0,
				message: "fake",
				response: fakeCrdbs,
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

const crdbs = (props: Props, options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["crdbs"],
		queryFn: () => get(props),
		...options,
	});
};

export const QueryCrdbs = {
	crdbs,
};
