import { Promises } from "@src/services/Promises";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { dbTokens, dbUsers } from "../../db/db";
import { FAKE_RESPONSE_DELAY, type QueryResult } from "../Api.types";

type MutateLoginProps = {
	email: string;
	password: string;
};

export type MutateLoginResult = QueryResult & {
	token: string;
};

export const mutateLogin = (options?: UseMutationOptions<MutateLoginResult, Error, MutateLoginProps, unknown>) => {
	const { mutateAsync } = useMutation({
		mutationFn: (props: MutateLoginProps) => sendLogin(props.email, props.password),
		...options,
	});

	return mutateAsync;
};

const sendLogin = async (email: string, password: string): Promise<MutateLoginResult> => {
	await Promises.sleep(FAKE_RESPONSE_DELAY);

	const userId = Object.keys(dbUsers).find((userId) => dbUsers[userId].email === email && dbUsers[userId].password === password);

	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
	} else {
		const token = `token_${Math.floor(Math.random() * 1_000_000)}`;

		dbTokens[token] = { userId, time: Date.now() };
		result.token = token;
	}

	return result;
};
