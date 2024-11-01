import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { IRole } from "../../../../Desktop.types";
import { getUser } from "../Api.services";
import type { QueryResult } from "../Api.types";

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
