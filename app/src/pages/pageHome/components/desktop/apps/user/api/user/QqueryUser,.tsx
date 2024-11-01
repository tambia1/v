import { Promises } from "@src/services/Promises";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { IRole } from "../../../../Desktop.types";
import { dbTokens, dbUsers } from "../../db/db";
import { FAKE_RESPONSE_DELAY, type QueryResult } from "../Api.types";

type QueryUserProps = {
	token: string;
};

export type QueryUserResult = QueryResult & {
	firstName: string;
	lastName: string;
	email: string;
	role: IRole;
};

export const queryUser = (props: QueryUserProps, options?: Partial<UseQueryOptions<QueryUserResult, Error>>) => {
	return useQuery({
		queryKey: ["users", { ...props }],
		queryFn: () => getUser(props.token),
		...options,
	});
};

const getUser = async (token: string): Promise<QueryUserResult> => {
	await Promises.sleep(FAKE_RESPONSE_DELAY);

	const result: QueryUserResult = {
		error: 0,
		message: "",
		firstName: "",
		lastName: "",
		email: "",
		role: "guest",
	};

	if (!token) {
		result.error = 1;
		result.message = "token is empty";
	} else if (!dbTokens[token]) {
		result.error = 2;
		result.message = "unauthorized";
	} else if (!dbUsers[dbTokens[token].userId]) {
		result.error = 3;
		result.message = "user not found";
	} else {
		const userId = dbTokens[token].userId;

		result.firstName = dbUsers[userId].firstName;
		result.lastName = dbUsers[userId].lastName;
		result.email = dbUsers[userId].email;
		result.role = dbUsers[userId].role;
	}

	return result;
};
