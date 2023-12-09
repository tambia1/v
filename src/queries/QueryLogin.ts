import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { getLogin, sendLogin, sendLogout } from "./api";

interface MutateLoginProps {
	email: string;
	password: string;
}

export interface MutateLoginResult extends QueryResult {
	token: string;
}

const mutateLogin = (options?: UseMutationOptions<MutateLoginResult, Error, MutateLoginProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLoginProps) => sendLogin(props.email, props.password),
	});

	return mutateAsync;
};

interface MutateLogoutProps {
	token: string;
}

export interface MutateLogoutResult extends QueryResult {}

const mutateLogout = (options?: UseMutationOptions<MutateLogoutResult, Error, MutateLogoutProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLogoutProps) => sendLogout(props.token),
	});

	return mutateAsync;
};

interface QueryLoginProps {
	token: string;
}

export interface QueryLoginResult extends QueryResult {
	token: string;
}

const queryLogin = (props: QueryLoginProps, options?: Partial<UseQueryOptions<MutateLoginResult, Error>>) => {
	return useQuery({
		queryKey: ["login"],
		queryFn: () => getLogin(props.token),
		...options,
	});
};

export const QueryLogin = {
	mutateLogin,
	mutateLogout,
	queryLogin,
};
