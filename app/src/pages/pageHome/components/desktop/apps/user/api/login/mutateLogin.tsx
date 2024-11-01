import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { sendLogin } from "../Api.services";
import type { QueryResult } from "../Api.types";

type MutateLoginProps = {
	email: string;
	password: string;
};

export type MutateLoginResult = QueryResult & {
	token: string;
};

export const mutateLogin = (options?: UseMutationOptions<MutateLoginResult, Error, MutateLoginProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLoginProps) => sendLogin(props.email, props.password),
	});

	return mutateAsync;
};
