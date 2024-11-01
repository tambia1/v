import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { sendLogin, sendLogout, sendToken } from "./Api";
import type { QueryResult } from "./Api.types";

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

interface MutateTokenProps {
	token: string;
}

export interface MutateTokenResult extends QueryResult {}

const mutateToken = (options?: UseMutationOptions<MutateTokenResult, Error, MutateTokenProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateTokenProps) => sendToken(props.token),
	});

	return mutateAsync;
};

export const ApiLogin = {
	mutateLogin,
	mutateLogout,
	mutateToken,
};
