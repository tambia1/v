import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { getUser } from "./Api";

export interface QueryUserResult extends QueryResult {
	firstName: string;
	lastName: string;
	email: string;
}

interface QueryUserProps {
	token: string;
}

const queryUser = (props: QueryUserProps, options?: Partial<UseQueryOptions<QueryUserResult, Error>>) => {
	return useQuery({
		queryKey: ["login", { ...props }],
		queryFn: () => getUser(props.token),
		...options,
	});
};

export const QueryUser = {
	queryUser,
};
