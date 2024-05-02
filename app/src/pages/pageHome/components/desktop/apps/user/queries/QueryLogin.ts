import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { sendLogin, sendLogout, sendToken } from "./Api";

interface MutateLoginProps {
	email: string;
	password: string;
}

export interface MutateLoginResult extends QueryResult {
	token: string;
}

const login = (options?: UseMutationOptions<MutateLoginResult, Error, MutateLoginProps, unknown>) => {
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

const logout = (options?: UseMutationOptions<MutateLogoutResult, Error, MutateLogoutProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLogoutProps) => sendLogout(props.token),
	});

	return mutateAsync;
};

interface MutateTokenProps {
	token: string;
}

export interface MutateTokenResult extends QueryResult {}

const token = (options?: UseMutationOptions<MutateTokenResult, Error, MutateTokenProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateTokenProps) => sendToken(props.token),
	});

	return mutateAsync;
};

export const QueryLogin = {
	login,
	logout,
	token,
};
