import { Promises } from "@src/services/Promises";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { dbTokens } from "../../db/db";
import { FAKE_RESPONSE_DELAY, type QueryResult } from "../Api.types";

type MutateLogoutProps = {
	token: string;
};

export type MutateLogoutResult = QueryResult & {};

export const mutateLogout = (options?: UseMutationOptions<MutateLogoutResult, Error, MutateLogoutProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLogoutProps) => sendLogout(props.token),
	});

	return mutateAsync;
};

const sendLogout = async (token: string): Promise<MutateLogoutResult> => {
	await Promises.sleep(FAKE_RESPONSE_DELAY);

	const result: MutateLogoutResult = {
		error: 0,
		message: "",
	};

	if (!dbTokens[token]) {
		result.error = 1;
		result.message = "invalid token";
	} else {
		delete dbTokens[token];
	}

	return result;
};
