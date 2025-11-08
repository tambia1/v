import type { ReactNode } from "react";

export type Props = {
	name: string;
	title: ReactNode;
	children: ReactNode;
};

export const Page = ({ children }: Props) => {
	return <>{children}</>;
};
