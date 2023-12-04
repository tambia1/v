import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryType } from "./Query.types";
import { getUser } from "./api";

export interface UserType extends QueryType {
	firstName: string;
	lastName: string;
	email: string;
}

interface UserProps {
	token: string;
	userId: string;
}

const user = (props: UserProps, options?: Partial<UseQueryOptions<UserType, Error>>) => {
	return useQuery({ queryKey: ["login"], queryFn: () => getUser(props.token, props.userId), ...options });
};

export const QueryUser = {
	user,
};
