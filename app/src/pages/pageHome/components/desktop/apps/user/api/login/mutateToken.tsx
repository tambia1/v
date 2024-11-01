import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { dbTokens, dbUsers } from "../../db/db";
import type { QueryResult } from "../Api.types";
import type { MutateLoginResult } from "./mutateLogin";

type MutateTokenProps = {
	token: string;
};

export type MutateTokenResult = QueryResult & {};

export const mutateToken = (options?: UseMutationOptions<MutateTokenResult, Error, MutateTokenProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateTokenProps) => sendToken(props.token),
	});

	return mutateAsync;
};

const sendToken = async (token: string): Promise<MutateTokenResult> => {
	const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const userInfo = await response.json();
	userInfo.email = "c";

	const userId = Object.keys(dbUsers).find((userId) => dbUsers[userId].email === userInfo.email);

	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
	} else {
		dbTokens[token] = { userId, time: Date.now() };
		result.token = token;
	}

	return result;
};
