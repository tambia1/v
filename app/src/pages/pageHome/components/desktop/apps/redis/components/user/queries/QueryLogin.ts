import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { login as fakeResponse } from "./../../../data/login";

type Props = {
	email: string;
	password: string;
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

const send = async (props: Props): Promise<Result> => {
	let result: Result = {
		error: 1,
		message: "error",
	};

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				password: props.password,
				username: props.email,
			}),
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

const login = (options?: UseMutationOptions<Result, Error, Props, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: Props) => send(props),
	});

	return mutateAsync;
};

export const QueryLogin = {
	login,
};
