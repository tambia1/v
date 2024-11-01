import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { sendLogout } from "../Api.services";
import type { QueryResult } from "../Api.types";

type MutateLogoutProps = {
	token: string;
};

export type MutateLogoutResult = QueryResult & {};

export const mutateLogout = (options?: UseMutationOptions<MutateLogoutResult, Error, MutateLogoutProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateLogoutProps) => sendLogout(props.token),
	});

	return mutateAsync;
};
