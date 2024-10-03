import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { login as fakeResponse } from "./../../../data/login";
import type { Login, QueryResult } from "./Query.types";

type Props = {
	email: string;
	password: string;
};

type Result = QueryResult<Login>;

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
