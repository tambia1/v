import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";

type Props = {
	csrf: string;
	only_customer_plans: boolean;
};

type Result = QueryResult<{
	auth_mode: string;
	current_account_id: string;
	email: string;
	id: string;
	name: string;
	permissions: string[];
	product_type: string;
	production: boolean;
	role: string;
	user_id: number;
}>;

const getPlans = async (props: Props): Promise<Result> => {
	let result: Result;

	try {
		const response = await fetch(`https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/plans?only_customer_plans=${props.only_customer_plans}`, {
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

	return result;
};

const plans = (props: Props, options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["plans", props.only_customer_plans],
		queryFn: () => getPlans(props),
		...options,
	});
};

export const QueryPlans = {
	plans,
};
