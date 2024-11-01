import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { IRole } from "../../../Desktop.types";
import { getUser } from "./Api";
import type { QueryResult } from "./Api.types";

export interface QueryUserResult extends QueryResult {
	firstName: string;
	lastName: string;
	email: string;
	role: IRole;
}

interface QueryUserProps {
	token: string;
}

const queryUser = (props: QueryUserProps, options?: Partial<UseQueryOptions<QueryUserResult, Error>>) => {
	return useQuery({
		queryKey: ["users", { ...props }],
		queryFn: () => getUser(props.token),
		...options,
	});
};

export const ApiUser = {
	queryUser,
};
