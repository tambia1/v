import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { sendLogin, sendLogout } from "./Api";
import { IRole } from "@src/pages/pageHome/components/desktop/Desktop.types";

interface MutateLoginProps {
	email: string;
	password: string;
}

export interface MutateLoginResult extends QueryResult {
	token: string;
	role: IRole;
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

export const QueryLogin = {
	login,
	logout,
};
