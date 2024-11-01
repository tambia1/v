import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { QueryResult } from "../Api.types";

type Props = {
	csrf: string;
	bdbId: number;
};

type CreateBdbResponse = typeof fakeResponse;
type Result = QueryResult<CreateBdbResponse>;

const send = async (props: Props): Promise<Result> => {
	let result: Result = {
		error: 1,
		message: "error",
	};

	try {
		const response = await fetch(`https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/bdb_packages/${props.bdbId}`, {
			method: "DELETE",
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

export const mutateDeleteBdb = (options?: UseMutationOptions<Result, Error, Props, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: Props) => send(props),
	});

	return mutateAsync;
};

const fakeResponse = {};
