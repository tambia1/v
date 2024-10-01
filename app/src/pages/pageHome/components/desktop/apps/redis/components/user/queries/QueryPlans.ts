import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Plan, QueryResult } from "./Query.types";
import { plans as fakeUserPlans } from "./../../../data/plans";
import { plansAll as fakeAllPlans } from "./../../../data/plansAll";

type Props = {
	csrf: string;
	only_customer_plans: boolean;
};

type Result = QueryResult<{
	plans: Plan[];
}>;

const get = async (props: Props): Promise<Result> => {
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

	if (result.error !== 0) {
		result = {
			error: 0,
			message: "fake",
			response: props.only_customer_plans ? fakeUserPlans : fakeAllPlans,
		};
	}

	return result;
};

const plans = (props: Props, options?: Partial<UseQueryOptions<Result, Error>>) => {
	return useQuery({
		queryKey: ["plans", props.only_customer_plans],
		queryFn: () => get(props),
		...options,
	});
};

export const QueryPlans = {
	plans,
};
