import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { login as fakeResponse } from "../../data/login";
import type { Login, QueryResult } from "../Api.types";

type Result = QueryResult<Login>;

const send = async (): Promise<Result> => {
	let result: Result = {
		error: 1,
		message: "error",
	};

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/login", {
			method: "DELETE",
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

export const mutateLogout = (options?: UseMutationOptions<Result, Error, void, unknown>) => {
	const { mutateAsync } = useMutation({
		mutationFn: () => send(),
		...options,
	});

	return mutateAsync;
};
