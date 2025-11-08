import type { ReactNode } from "react";

export interface Props {
	name: string;
	title: ReactNode;
	children: ReactNode;
}

export const Page = ({ children }: Props) => {
	return <>{children}</>;
};
